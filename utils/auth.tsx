import sqlite3 from 'sqlite3';

export function checkActiveUser(token: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(process.env.SQLITE_DATABASE);
    db.get(
      `SELECT * FROM activeUsers WHERE token = ?`,
      [token],
      (err, row) => {
        db.close();
        if (err) {
          reject(err);
        } else if (row) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    );
  });
}
