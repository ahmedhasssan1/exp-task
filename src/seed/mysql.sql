// clents-seed ;

INSERT INTO clients (name, company_name, contact_email, password) VALUES
('Ahmed Hassan', 'TechVision Solutions', 'ahmed.hassan@example.com', '123456'),
('Sara Ali', 'GlobalSoft Technologies', 'sara.ali@example.com', '123456');


// projects-seed ;

INSERT INTO projects (client_id, country, name, service_nedded, budget, status)
VALUES
(1, 'Egypt', 'E-Commerce Platform', 'web development,mobile app,payment integration', 15000, 'active'),
(2, 'UAE', 'AI Chatbot System', 'ai chatbot,nlp,customer support automation', 20000, 'pending');


//vendors-seed ;

INSERT INTO vendor (name, countries_supported, service_offered, rating, response_sla_hours, sla_expired)
VALUES
(
    'Tech Solutions LLC',
    'Egypt,UAE,Saudi Arabia',
    'web development,mobile app,payment integration',
    4.7,
    24,
    false
),
(
    'AI Innovators Inc',
    'USA,UK,Germany',
    'ai chatbot,nlp,data analytics',
    4.9,
    48,
    false
);

