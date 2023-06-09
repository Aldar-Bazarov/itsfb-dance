create database dance_russia_1;

CREATE TABLE news (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  published_date TIMESTAMP NOT NULL DEFAULT NOW(),
  is_published BOOLEAN NOT NULL DEFAULT FALSE
);


INSERT INTO news (title, content, author, published_date, is_published) VALUES 
('Конкурс "Танцы в стиле хип-хоп"', 'Школа танцев приглашает всех желающих на конкурс "Танцы в стиле хип-хоп"!', 'Анна Иванова', '2023-04-15 10:00:00', TRUE),
('Новые занятия по танцам', 'Школа танцев открывает новые занятия по танцам для детей и взрослых!', 'Иван Петров', '2023-04-10 14:30:00', TRUE),
('Выступление на международном фестивале', 'Школа танцев представит свои лучшие номера на международном фестивале танца в Лондоне!', 'Ольга Смирнова', '2023-05-20 18:00:00', FALSE),
('Мастер-класс от известного танцора', 'Школа танцев приглашает на мастер-класс от известного танцора Алексея Лебедева!', 'Андрей Кузнецов', '2023-04-25 12:00:00', TRUE),
('Открытие нового филиала', 'Школа танцев открывает новый филиал в центре города!', 'Елена Николаева', '2023-05-01 09:00:00', FALSE),
('Каникулы в школе танцев', 'Школа танцев объявляет каникулы с 1 по 10 мая. Занятия возобновятся 11 мая!', 'Денис Константинов', '2023-04-30 15:00:00', TRUE),
('Шоу-программа на юбилее города', 'Школа танцев представит свою шоу-программу на юбилее города 20 мая!', 'Анна Иванова', '2023-05-20 14:00:00', FALSE)