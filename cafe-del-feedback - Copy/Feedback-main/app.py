from flask import Flask, render_template, request, redirect, url_for, session
import sqlite3

app = Flask(__name__)
app.secret_key = 'supersecretkey'  # Change this in production

ADMIN_USERNAME = 'admin'
ADMIN_PASSWORD = 'admin123'

# Create database and table
def init_db():
    with sqlite3.connect('feedback.db') as conn:
        conn.execute('''CREATE TABLE IF NOT EXISTS feedback (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            name TEXT,
                            email TEXT,
                            item TEXT,
                            rating INTEGER,
                            message TEXT
                        )''')

@app.route('/feedback')
def feedback_form():
    return render_template('feedback_form.html')

@app.route('/submit', methods=['POST'])
def submit_feedback():
    name = request.form['name']
    email = request.form['email']
    item = request.form['item']
    rating = request.form['rating']
    message = request.form['message']

    with sqlite3.connect('feedback.db') as conn:
        conn.execute("INSERT INTO feedback (name, email, item, rating, message) VALUES (?, ?, ?, ?, ?)",
                     (name, email, item, rating, message))
    return redirect(url_for('feedbacks'))

@app.route('/feedbacks')
def feedbacks():
    with sqlite3.connect('feedback.db') as conn:
        cursor = conn.execute("SELECT name, item, rating, message FROM feedback")
        all_feedbacks = cursor.fetchall()

        cursor = conn.execute("SELECT item, AVG(rating) as avg_rating FROM feedback GROUP BY item")
        avg_ratings = cursor.fetchall()

        cursor = conn.execute("SELECT COUNT(*) FROM feedback")
        total_feedback = cursor.fetchone()[0]

        cursor = conn.execute("SELECT AVG(rating) FROM feedback")
        overall_avg_rating = round(cursor.fetchone()[0] or 0, 2)

        cursor = conn.execute("SELECT item, AVG(rating) as avg FROM feedback GROUP BY item ORDER BY avg DESC LIMIT 1")
        top_item_data = cursor.fetchone()
        top_item = top_item_data[0] if top_item_data else "N/A"
        top_item_rating = round(top_item_data[1], 2) if top_item_data else 0

    return render_template(
        'feedbacks.html',
        feedbacks=all_feedbacks,
        avg_ratings=avg_ratings,
        total_feedback=total_feedback,
        overall_avg_rating=overall_avg_rating,
        top_item=top_item,
        top_item_rating=top_item_rating
    )

@app.route('/admin')
def admin_view():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))

    with sqlite3.connect('feedback.db') as conn:
        cursor = conn.execute("SELECT name, email, item, rating, message FROM feedback")
        feedbacks = cursor.fetchall()

        cursor = conn.execute("SELECT item, AVG(rating) as avg_rating FROM feedback GROUP BY item ORDER BY avg_rating DESC LIMIT 5")
        top_rated = cursor.fetchall()

    return render_template('admin_view.html', feedbacks=feedbacks, top_rated=top_rated)

@app.route('/logout')
def logout():
    session.pop('admin', None)
    return redirect(url_for('admin_login'))

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
