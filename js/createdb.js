import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const db = new sqlite3.Database('./db/test.db');
