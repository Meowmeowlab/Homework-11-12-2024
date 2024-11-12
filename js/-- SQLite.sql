-- SQLite
CREATE TABLE IF NOT EXISTS Room (
    RoomId INTEGER PRIMARY KEY,
    RoomType TEXT NOT NULL,
    RoomLocation TEXT NOT NULL,
    BasePrice INTEGER NOT NULL
) CREATE TABLE IF NOT EXISTS User (
    UserId INTEGER PRIMARY KEY,
    UserName TEXT NOT NULL,
    UserNationality TEXT NOT NULL,
    UserAge TEXT NOT NULL,
    UserIdentification TEXT NOT NULL
) CREATE TABLE IF NOT EXISTS Services (
    ServiceId INTEGER PRIMARY KEY,
    ServiceType TEXT NOT NULL,
    BasePrice INTEGER NOT NULL
) CREATE TABLE IF NOT EXISTS ServiceManager (
    ServiceManagerId INTEGER PRIMARY KEY,
    RoomId INTEGER NOT NULL,
    ServiceId INTEGER NOT NULL,
    UserId INTEGER NOT NULL,
    Amount INTEGER NOT NULL,
    FOREIGN KEY (ServiceId) REFERENCES Services (ServiceId),
    FOREIGN KEY (UserId) REFERENCES User (UserId),
    FOREIGN KEY (RoomId) REFERENCES Room (RoomId)
) CREATE TABLE IF NOT EXISTS RoomManager (
    RoomManagerId INTEGER PRIMARY KEY,
    UserId INTEGER NOT NULL,
    RoomId INTEGER NOT NULL,
    Book TEXT NOT NULL,
    Expire TEXT NOT NULL,
    FOREIGN KEY (RoomId) REFERENCES Room (RoomId),
    FOREIGN KEY (UserId) REFERENCES User (UserId)
) CREATE TABLE IF NOT EXISTS Receipt (
    ReceiptId INTEGER PRIMARY KEY,
    RoomManagerId INTEGER NOT NULL,
    ServiceManagerId INTEGER NOT NULL,
    UserId INTEGER NOT NULL,
    TotalPrice INTEGER NOT NULL,
    ExportDate TEXT NOT NULL,
    FOREIGN KEY (RoomManagerId) REFERENCES RoomManager (RoomManagerId),
    FOREIGN KEY (UserId) REFERENCES User (UserId),
    FOREIGN KEY (ServiceManagerId) REFERENCES ServiceManager (ServiceManagerId)
);
BEGIN TRANSACTION --User Cold Desert
--Room Breakfast
--Service Utencil
INSERT INTO Room (RoomType, RoomLocation, BasePrice)
VALUES ('Waffle', 'AB', '1250'),
    ('Pancakes', 'AB', '2250'),
    ('Toast', 'BB', '2000') -- 101 = 1.01$
INSERT INTO Services (ServiceType, BasePrice)
VALUES ('Fork', '200'),
    ('Spoon', '100'),
    ('Knife', '500')
INSERT INTO User (
        UserName,
        UserAge,
        UserNationality,
        UserIdentification
    )
VALUES ('Apple Ice Cream', '10', 'CA', '12345'),
    ('Mint Chocolate Chip', '12', 'US', '23456'),
    ('Chocolate Ice Cream', '16', 'KR', '34567') COMMIT
SELECT *
FROM RoomManager