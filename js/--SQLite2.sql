BEGIN TRANSACTION
DELETE FROM User
INSERT INTO User (
        UserName,
        UserAge,
        UserNationality,
        UserIdentification
    )
VALUES ("Karlens", "2012", "US", "1024873811"),
    ("Siusan", "1998", "US", "0518320596"),
    ("Lizbeth", "1992", "CA", "4754400356"),
    ("Bradan", "1994", "US", "3054963705"),
    ("Vi", "1985", "PK", "1875939849"),
    ("Aubrey", "1993", "MY", "6969634043"),
    ("Shela", "1997", "NG", "9457153588"),
    ("Chanda", "1995", "US", "3410034277"),
    ("Ramsey", "1989", "BJ", "5956505192"),
    ("Annabell", "1985", "MV", "6539947119"),
    ("Danica", "1997", "CO", "7401727366"),
    ("Dot", "2008", "PY", "8189366807"),
    ("Dianna", "2004", "LR", "0023793139"),
    ("Toddie", "2012", "VE", "7670550244"),
    ("Woodie", "2010", "TH", "2609216882") COMMIT;
--
--
--
DELETE FROM Services
INSERT INTO Services (ServiceType, BasePrice)
VALUES ('Khăn Tắm', '100'),
    ('Ăn sáng', '1050'),
    ('Ăn trưa', '1500'),
    ('Ăn tối', '1500'),
    ('Giặt đồ', '500'),
    ('Kem lạnh', '2500'),
    ('Nước uống', '1000'),
    ('Nước ngọt', '2100') --
    --
DELETE FROM Receipt
WHERE ReceiptId = 2 --
    --
DELETE FROM Room --
INSERT INTO Room (RoomType, RoomLocation, BasePrice)
VALUES ("WAJC", "Capparaceae", "55522"),
    ("HTGR", "Asteraceae", "34986"),
    ("DSAW", "Poaceae", "35519"),
    ("CYPZ", "Scrophulariaceae", "45625"),
    ("VOBZ", "Agavaceae", "86779"),
    ("7NC2", "Hymeneliaceae", "69830"),
    ("LGLR", "Brassicaceae", "32142"),
    ("CAY4", "Myrsinaceae", "20307"),
    ("OIIE", "Asteraceae", "43598"),
    ("PACI", "Betulaceae", "70003"),
    ("KSLB", "Droseraceae", "47749"),
    ("WIOM", "Orchidaceae", "74574"),
    ("NZDN", "Bryaceae", "61016"),
    ("SEQM", "Verbenaceae", "38601"),
    ("AYGT", "Plumbaginaceae", "21164") -- 101 = 1.01$