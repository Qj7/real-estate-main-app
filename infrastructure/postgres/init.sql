-- Real Estate Database Initialization Script
-- This script creates the database schema as per TZ requirements

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create enum types
CREATE TYPE object_type AS ENUM ('apartment', 'studio', 'villa', 'developer_tour');
CREATE TYPE object_status AS ENUM ('for_sale', 'for_rent', 'under_construction', 'planned');
CREATE TYPE published_status AS ENUM ('draft', 'moderation', 'published', 'archived');
CREATE TYPE link_type AS ENUM ('main', 'partner');
CREATE TYPE event_type AS ENUM (
    'open_app',
    'open_partner_showroom',
    'view_object',
    'start_tour',
    'end_tour',
    'favorite_add',
    'favorite_remove',
    'click_contact'
);
CREATE TYPE admin_role AS ENUM (
    'SuperAdmin',
    'Admin',
    'Partner',
    'Developer',
    'Support',
    'Moderator',
    'Viewer'
);

-- Partners table
CREATE TABLE partners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    logo_url TEXT,
    contacts JSONB DEFAULT '{}',
    showroom_settings JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Developers table
CREATE TABLE developers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    logo_url TEXT,
    contacts JSONB DEFAULT '{}',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Objects table
CREATE TABLE objects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    location JSONB,
    city VARCHAR(100),
    district VARCHAR(100),
    type object_type NOT NULL,
    rooms INTEGER,
    area NUMERIC(10, 2),
    price_min NUMERIC(12, 2),
    price_max NUMERIC(12, 2),
    status object_status NOT NULL,
    partner_id UUID REFERENCES partners(id) ON DELETE SET NULL,
    developer_id UUID REFERENCES developers(id) ON DELETE SET NULL,
    matterport_link TEXT,
    images JSONB DEFAULT '[]',
    description TEXT,
    added_date TIMESTAMPTZ DEFAULT NOW(),
    published_status published_status DEFAULT 'draft',
    tags TEXT[] DEFAULT '{}',
    meta JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin users table
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role admin_role NOT NULL DEFAULT 'Viewer',
    twofa_secret VARCHAR(255),
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- MiniApp users table (anonymous/pseudonymized)
CREATE TABLE miniapp_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tg_id_hash VARCHAR(255) UNIQUE NOT NULL,
    tg_username_hash VARCHAR(255),
    first_seen_at TIMESTAMPTZ DEFAULT NOW(),
    last_seen_at TIMESTAMPTZ DEFAULT NOW(),
    origin_source VARCHAR(100) DEFAULT 'main',
    campaign VARCHAR(255),
    meta JSONB DEFAULT '{}'
);

-- Links table (deeplinks and campaigns)
CREATE TABLE links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type link_type NOT NULL,
    partner_id UUID REFERENCES partners(id) ON DELETE CASCADE,
    campaign VARCHAR(255),
    utm JSONB DEFAULT '{}',
    qr_url TEXT,
    expires_at TIMESTAMPTZ,
    max_clicks INTEGER,
    click_count INTEGER DEFAULT 0,
    meta JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events table (analytics)
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ts TIMESTAMPTZ DEFAULT NOW(),
    user_miniapp_id UUID REFERENCES miniapp_users(id) ON DELETE SET NULL,
    event event_type NOT NULL,
    object_id UUID REFERENCES objects(id) ON DELETE SET NULL,
    source VARCHAR(100),
    campaign VARCHAR(255),
    session_id VARCHAR(255),
    duration_ms INTEGER,
    meta JSONB DEFAULT '{}'
);

-- Audit log table
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_user_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity VARCHAR(100) NOT NULL,
    entity_id UUID,
    before JSONB,
    after JSONB,
    ip INET,
    ua TEXT,
    ts TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_objects_published_status ON objects(published_status);
CREATE INDEX idx_objects_city ON objects(city);
CREATE INDEX idx_objects_type ON objects(type);
CREATE INDEX idx_objects_status ON objects(status);
CREATE INDEX idx_objects_partner_id ON objects(partner_id);
CREATE INDEX idx_objects_developer_id ON objects(developer_id);
CREATE INDEX idx_objects_matterport_link ON objects(matterport_link) WHERE matterport_link IS NOT NULL;

CREATE INDEX idx_events_ts ON events(ts);
CREATE INDEX idx_events_event ON events(event);
CREATE INDEX idx_events_user_miniapp_id ON events(user_miniapp_id);
CREATE INDEX idx_events_object_id ON events(object_id);
CREATE INDEX idx_events_session_id ON events(session_id);

CREATE INDEX idx_links_campaign ON links(campaign) WHERE campaign IS NOT NULL;
CREATE INDEX idx_links_partner_id ON links(partner_id) WHERE partner_id IS NOT NULL;

CREATE INDEX idx_miniapp_users_tg_id_hash ON miniapp_users(tg_id_hash);
CREATE INDEX idx_miniapp_users_origin_source ON miniapp_users(origin_source);

CREATE INDEX idx_audit_log_admin_user_id ON audit_log(admin_user_id);
CREATE INDEX idx_audit_log_entity ON audit_log(entity, entity_id);
CREATE INDEX idx_audit_log_ts ON audit_log(ts);

-- Full-text search indexes
CREATE INDEX idx_objects_title_trgm ON objects USING gin(title gin_trgm_ops);
CREATE INDEX idx_objects_description_trgm ON objects USING gin(description gin_trgm_ops);

-- Functions for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_partners_updated_at BEFORE UPDATE ON partners
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_developers_updated_at BEFORE UPDATE ON developers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON objects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_links_updated_at BEFORE UPDATE ON links
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

