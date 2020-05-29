CREATE DATABASE techtable;

CREATE TABLE webinar(
  webinar_id SERIAL PRIMARY KEY,
  host_of_webinar VARCHAR(255) NOT NULL,
  meeting_id VARCHAR(255) default 'NA',
  meeting_password VARCHAR(255) default 'NA',
  platform_for_meeting VARCHAR(255) default 'NA',
  type_of_webinar VARCHAR(255) NOT NULL,
  agenda VARCHAR(255) NOT NULL,
  registration_link VARCHAR(255) NOT NULL,
  posting_date DATE NOT NULL
);