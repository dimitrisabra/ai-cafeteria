from datetime import date
import os
import re
import smtplib
from email.message import EmailMessage
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)
MAX_MESSAGE_LENGTH = 300
CONTACT_SENDER_EMAIL = os.getenv("CONTACT_SENDER_EMAIL", "dimitrisabra10@gmail.com")
CONTACT_RECIPIENT_EMAIL = os.getenv("CONTACT_RECIPIENT_EMAIL", CONTACT_SENDER_EMAIL)
CONTACT_APP_PASSWORD = os.getenv("CONTACT_APP_PASSWORD", "")
PREFERENCE_KEYS = ("vegetarian", "healthy", "spicy")


def normalize_app_password(raw_password):
    return "".join(str(raw_password).split()) if raw_password else ""

main_meals = [
    {"name": "BBQ Chicken Pizza", "category": "main_meals", "price": 11.99, "vegetarian": 0, "healthy": 0, "spicy": 1},
    {"name": "Beef Burger with Fries", "category": "main_meals", "price": 10.49, "vegetarian": 0, "healthy": 0, "spicy": 0},
    {"name": "Beef Stir Fry with Rice", "category": "main_meals", "price": 12.25, "vegetarian": 0, "healthy": 1, "spicy": 1},
    {"name": "Beef Tacos", "category": "main_meals", "price": 9.99, "vegetarian": 0, "healthy": 0, "spicy": 1},
    {"name": "Chicken Alfredo Pasta", "category": "main_meals", "price": 11.25, "vegetarian": 0, "healthy": 0, "spicy": 0},
    {"name": "Chicken Curry with Rice", "category": "main_meals", "price": 10.99, "vegetarian": 0, "healthy": 0, "spicy": 1},
    {"name": "Chicken Parmesan with Pasta", "category": "main_meals", "price": 12.49, "vegetarian": 0, "healthy": 0, "spicy": 0},
    {"name": "Chicken Shawarma Plate", "category": "main_meals", "price": 11.75, "vegetarian": 0, "healthy": 0, "spicy": 0},
    {"name": "Grilled Chicken with Rice", "category": "main_meals", "price": 10.75, "vegetarian": 0, "healthy": 1, "spicy": 0},
    {"name": "Grilled Salmon with Quinoa", "category": "main_meals", "price": 14.99, "vegetarian": 0, "healthy": 1, "spicy": 0},
    {"name": "Lamb Kafta with Rice", "category": "main_meals", "price": 13.50, "vegetarian": 0, "healthy": 0, "spicy": 0},
    {"name": "Margherita Pizza", "category": "main_meals", "price": 9.49, "vegetarian": 1, "healthy": 0, "spicy": 0},
    {"name": "Mushroom Risotto", "category": "main_meals", "price": 10.99, "vegetarian": 1, "healthy": 0, "spicy": 0},
    {"name": "Pepperoni Pizza", "category": "main_meals", "price": 10.25, "vegetarian": 0, "healthy": 0, "spicy": 0},
    {"name": "Seafood", "category": "main_meals", "price": 15.50, "vegetarian": 0, "healthy": 1, "spicy": 0},
    {"name": "Spaghetti Bolognese", "category": "main_meals", "price": 10.95, "vegetarian": 0, "healthy": 0, "spicy": 0},
    {"name": "Vegetable Pasta Primavera", "category": "main_meals", "price": 9.75, "vegetarian": 1, "healthy": 1, "spicy": 0},
    {"name": "Veggie Burger", "category": "main_meals", "price": 9.95, "vegetarian": 1, "healthy": 0, "spicy": 0},
    {"name": "Cheese Manakish", "category": "main_meals", "price": 7.50, "vegetarian": 1, "healthy": 0, "spicy": 0},
    {"name": "Zaatar Manakish", "category": "main_meals", "price": 6.99, "vegetarian": 1, "healthy": 1, "spicy": 0}
]

beverages = [
    {"name": "Apple Juice", "category": "beverages", "price": 2.50, "vegetarian": 1, "healthy": 1, "spicy": 0},
    {"name": "Coffee", "category": "beverages", "price": 2.75, "vegetarian": 1, "healthy": 1, "spicy": 0},
    {"name": "Coke", "category": "beverages", "price": 2.25, "vegetarian": 1, "healthy": 0, "spicy": 0},
    {"name": "Green Tea", "category": "beverages", "price": 2.40, "vegetarian": 1, "healthy": 1, "spicy": 0},
    {"name": "Iced Tea", "category": "beverages", "price": 2.50, "vegetarian": 1, "healthy": 1, "spicy": 0},
    {"name": "Lemonade", "category": "beverages", "price": 2.60, "vegetarian": 1, "healthy": 1, "spicy": 0},
    {"name": "Milkshake", "category": "beverages", "price": 3.75, "vegetarian": 1, "healthy": 0, "spicy": 0},
    {"name": "Orange Juice", "category": "beverages", "price": 2.70, "vegetarian": 1, "healthy": 1, "spicy": 0},
    {"name": "Pepsi", "category": "beverages", "price": 2.25, "vegetarian": 1, "healthy": 0, "spicy": 0},
    {"name": "Water", "category": "beverages", "price": 1.25, "vegetarian": 1, "healthy": 1, "spicy": 0}
]

snacks = [
    {"name": "Candy", "category": "snacks", "price": 1.80, "vegetarian": 1, "healthy": 0, "spicy": 0},
    {"name": "Chips", "category": "snacks", "price": 1.95, "vegetarian": 1, "healthy": 0, "spicy": 0},
    {"name": "Chocolate Bar", "category": "snacks", "price": 2.10, "vegetarian": 1, "healthy": 0, "spicy": 0},
    {"name": "Cookies", "category": "snacks", "price": 2.25, "vegetarian": 1, "healthy": 0, "spicy": 0},
    {"name": "Fruit Chips", "category": "snacks", "price": 2.35, "vegetarian": 1, "healthy": 1, "spicy": 0},
    {"name": "Granola Bar", "category": "snacks", "price": 2.00, "vegetarian": 1, "healthy": 1, "spicy": 0},
    {"name": "Nachos", "category": "snacks", "price": 2.95, "vegetarian": 1, "healthy": 0, "spicy": 1},
    {"name": "Popcorn", "category": "snacks", "price": 2.20, "vegetarian": 1, "healthy": 0, "spicy": 0},
    {"name": "Pretzels", "category": "snacks", "price": 1.90, "vegetarian": 1, "healthy": 0, "spicy": 0},
    {"name": "Trail Mix", "category": "snacks", "price": 2.65, "vegetarian": 1, "healthy": 1, "spicy": 0}
]

desserts = [
    {"name": "Apple Pie", "category": "desserts", "price": 3.20, "vegetarian": 1, "healthy": 0, "spicy": 0},
    {"name": "Brownie", "category": "desserts", "price": 2.90, "vegetarian": 1, "healthy": 0, "spicy": 0},
    {"name": "Cheesecake", "category": "desserts", "price": 3.60, "vegetarian": 1, "healthy": 0, "spicy": 0},
    {"name": "Chocolate Cake", "category": "desserts", "price": 3.50, "vegetarian": 1, "healthy": 0, "spicy": 0},
    {"name": "Cupcake", "category": "desserts", "price": 2.75, "vegetarian": 1, "healthy": 0, "spicy": 0},
    {"name": "Donut", "category": "desserts", "price": 2.35, "vegetarian": 1, "healthy": 0, "spicy": 0},
    {"name": "Fruit Salad", "category": "desserts", "price": 3.00, "vegetarian": 1, "healthy": 1, "spicy": 0},
    {"name": "Ice Cream", "category": "desserts", "price": 2.95, "vegetarian": 1, "healthy": 0, "spicy": 0},
    {"name": "Pancake", "category": "desserts", "price": 3.25, "vegetarian": 1, "healthy": 0, "spicy": 0},
    {"name": "Waffle", "category": "desserts", "price": 3.40, "vegetarian": 1, "healthy": 0, "spicy": 0}
]


def build_preferences(payload):
    return {key: 1 if int(payload.get(key, 0)) else 0 for key in PREFERENCE_KEYS}


def recommend_meals(preferences, limit=3):
    def distance(meal):
        return sum(abs(int(meal.get(key, 0)) - preferences[key]) for key in PREFERENCE_KEYS)

    return sorted(main_meals, key=lambda meal: (distance(meal), float(meal.get("price", 0)), meal.get("name", "")))[:limit]

@app.route("/menu", methods=["GET"])
def menu():
    return jsonify(main_meals)

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json(silent=True) or {}
    preferences = build_preferences(data)
    recommended = recommend_meals(preferences, limit=3)
    return jsonify(recommended)

@app.route("/contact", methods=["POST"])
def contact():
    data = request.get_json(silent=True) or {}
    name = str(data.get("name", "")).strip()
    message = str(data.get("message", "")).strip()

    if not name:
        return jsonify({"error": "Name is required."}), 400
    if not message:
        return jsonify({"error": "Message is required."}), 400
    if len(message) > 2000:
        return jsonify({"error": "Message is too long. Keep it under 2000 characters."}), 400
    app_password = normalize_app_password(CONTACT_APP_PASSWORD)

    if not app_password:
        return jsonify({"error": "Email is not configured. Set CONTACT_APP_PASSWORD in backend environment."}), 500

    email = EmailMessage()
    email["Subject"] = f"Contact Form Message from {name}"
    email["From"] = CONTACT_SENDER_EMAIL
    email["To"] = CONTACT_RECIPIENT_EMAIL
    email.set_content(f"Name: {name}\n\nMessage:\n{message}")

    try:
        with smtplib.SMTP("smtp.gmail.com", 587, timeout=20) as server:
            server.starttls()
            server.login(CONTACT_SENDER_EMAIL, app_password)
            server.send_message(email)
    except smtplib.SMTPAuthenticationError:
        return jsonify({
            "error": (
                "Email authentication failed. Verify CONTACT_SENDER_EMAIL matches the Gmail account "
                "that generated CONTACT_APP_PASSWORD and use a valid Gmail App Password."
            )
        }), 500
    except Exception as exc:
        return jsonify({"error": f"Failed to send email: {str(exc)}"}), 500

    return jsonify({"message": "Email sent successfully."})


def get_daily_meal(day_of_month=None):
    day_value = date.today().day
    if isinstance(day_of_month, int) and 1 <= day_of_month <= 31:
        day_value = day_of_month
    index = day_value % len(main_meals)
    return main_meals[index]


def get_price_limit(text):
    match = re.search(r"(?:under|below|less than|<=|<)\s*\$?\s*(\d+(?:\.\d+)?)", text)
    if not match:
        return None
    return float(match.group(1))


def apply_filters(items, text):
    filtered = list(items)
    wants_not_spicy = any(phrase in text for phrase in ("not spicy", "non spicy", "mild"))

    if any(word in text for word in ("vegetarian", "veggie", "vegan")):
        filtered = [item for item in filtered if item.get("vegetarian") == 1]
    if "healthy" in text:
        filtered = [item for item in filtered if item.get("healthy") == 1]
    if "spicy" in text and not wants_not_spicy:
        filtered = [item for item in filtered if item.get("spicy") == 1]
    if wants_not_spicy:
        filtered = [item for item in filtered if item.get("spicy") == 0]

    price_limit = get_price_limit(text)
    if price_limit is not None:
        filtered = [item for item in filtered if float(item.get("price", 0)) <= price_limit]

    return filtered


def is_greeting_message(text):
    normalized = re.sub(r"[^a-z\s]", " ", text.lower())
    normalized = " ".join(normalized.split())
    if not normalized:
        return False

    greeting_phrases = {
        "hi", "hello", "hey", "hey there", "greetings", "good morning",
        "good afternoon", "good evening", "greet", "greet me"
    }
    request_words = {
        "meal", "menu", "food", "snack", "dessert", "beverage", "drink",
        "under", "price", "healthy", "vegetarian", "spicy", "daily", "today"
    }

    if normalized in greeting_phrases:
        return True

    parts = normalized.split()
    if parts and parts[0] in {"hi", "hello", "hey", "greetings"} and len(parts) <= 4:
        if not any(word in request_words for word in parts):
            return True

    return False


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json(silent=True) or {}
    message = str(data.get("message", "")).strip().lower()
    message = " ".join(message.split())
    client_day = data.get("clientDay")
    try:
        client_day = int(client_day) if client_day is not None else None
    except (TypeError, ValueError):
        client_day = None

    if not message:
        return jsonify({
            "reply": "Tell me what you want, like 'healthy meals under 10' or 'vegetarian snacks'.",
            "items": []
        })

    if len(message) > MAX_MESSAGE_LENGTH:
        return jsonify({
            "reply": f"Please keep your message under {MAX_MESSAGE_LENGTH} characters.",
            "items": []
        }), 400

    if is_greeting_message(message):
        return jsonify({
            "reply": "Hi! How can I help you today?",
            "items": []
        })

    if "help" in message:
        return jsonify({
            "reply": (
                "Try categories (meals, beverages, snacks, desserts), filters (vegetarian, healthy, spicy, not spicy), "
                "and price limits (under 10)."
            ),
            "items": []
        })

    selected_groups = []
    wants_daily = any(word in message for word in ("daily", "today", "special"))
    wants_main_meals = any(word in message for word in ("menu", "main", "lunch", "dinner", "food", "meals"))
    wants_beverages = any(word in message for word in ("beverage", "drink", "juice", "coffee", "tea", "water", "soda"))
    wants_snacks = any(word in message for word in ("snack", "chips", "cookie", "cookies", "nachos", "pretzels"))
    wants_desserts = any(word in message for word in ("dessert", "sweet", "cake", "ice cream", "waffle", "pancake"))

    if wants_daily and not any((wants_main_meals, wants_beverages, wants_snacks, wants_desserts)):
        daily_item = dict(get_daily_meal(client_day), category="daily_meal")
        return jsonify({
            "reply": "Found 1 item(s) from daily meal.",
            "items": [daily_item],
            "total": 1
        })

    if wants_beverages:
        selected_groups.append(("beverages", beverages))
    if wants_snacks:
        selected_groups.append(("snacks", snacks))
    if wants_desserts:
        selected_groups.append(("desserts", desserts))
    if wants_daily:
        selected_groups.append(("daily meal", [dict(get_daily_meal(client_day), category="daily_meal")]))
    if wants_main_meals or (re.search(r"\bmeal\b", message) and not wants_daily):
        selected_groups.append(("main meals", main_meals))

    if not selected_groups:
        selected_groups = [
            ("main meals", main_meals),
            ("beverages", beverages),
            ("snacks", snacks),
            ("desserts", desserts)
        ]

    all_candidates = []
    selected_labels = []

    for label, group_items in selected_groups:
        selected_labels.append(label)
        all_candidates.extend(group_items)

    items = apply_filters(all_candidates, message)
    items = sorted(items, key=lambda x: float(x.get("price", 0)))
    total_count = len(items)

    if items:
        reply = f"Found {len(items)} item(s) from {', '.join(selected_labels)}."
    else:
        reply = "No matching items found. Try a broader request like 'healthy beverages' or 'menu under 10'."

    return jsonify({"reply": reply, "items": items, "total": total_count})


if __name__ == "__main__":
    app.run(debug=False, host="0.0.0.0", port=5000)






