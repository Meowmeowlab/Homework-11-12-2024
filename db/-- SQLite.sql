-- SQLite
CREATE TABLE IF NOT EXISTS
    Room (
        RoomId INTEGER PRIMARY KEY,
        RoomType TEXT NOT NULL,
        RoomLocation TEXT NOT NULL,
        BasePrice INTEGER NOT NULL
    )
CREATE TABLE IF NOT EXISTS
    Customer (
        CustomerId INTEGER PRIMARY KEY,
        CustomerName TEXT NOT NULL,
        CustomerNationality TEXT NOT NULL,
        CustomerAge TEXT NOT NULL,
        CustomerIdentification TEXT NOT NULL
    )
CREATE TABLE IF NOT EXISTS
    Services (
        ServiceId INTEGER PRIMARY KEY,
        ServiceType TEXT NOT NULL,
        BasePrice INTEGER NOT NULL
    )
CREATE TABLE IF NOT EXISTS
    ServiceManager (
        ServiceManagerId INTEGER PRIMARY KEY,
        RoomId INTEGER NOT NULL,
        ServiceId INTEGER NOT NULL,
        CustomerId INTEGER NOT NULL,
        Amount INTEGER NOT NULL,
        FOREIGN KEY (ServiceId) REFERENCES Services (ServiceId),
        FOREIGN KEY (CustomerId) REFERENCES Customer (CustomerId),
        FOREIGN KEY (RoomId) REFERENCES Room (RoomId)
    )
CREATE TABLE IF NOT EXISTS
    RoomManager (
        RoomManagerId INTEGER PRIMARY KEY,
        RoomId INTEGER NOT NULL,
        CustomerId INTEGER NOT NULL,
        Expire TEXT NOT NULL,
        FOREIGN KEY (RoomId) REFERENCES Services (RoomId),
        FOREIGN KEY (CustomerId) REFERENCES Customer (CustomerId)
    )
CREATE TABLE IF NOT EXISTS
    Receipt (
        ReceiptId INTEGER PRIMARY KEY,
        RoomId INTEGER NOT NULL,
        ServiceId INTEGER NOT NULL,
        CustomerId INTEGER NOT NULL,
        TotalPrice INTEGER NOT NULL,
        ExportDate TEXT NOT NULL,
        FOREIGN KEY (RoomId) REFERENCES Room (RoomId),
        FOREIGN KEY (CustomerId) REFERENCES Customer (CustomerId),
        FOREIGN KEY (ServiceId) REFERENCES Services (ServiceId)
    )