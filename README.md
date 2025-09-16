# Math Mind — Number Fact Generator

Math Mind is a simple Node.js + Express app that generates interesting facts about numbers using the [Numbers API](http://numbersapi.com).

It supports four types of facts:

* **Trivia** facts
* **Math** facts
* **Date** facts
* **Year** facts

### How It Works

* By default, the app runs in **Random Mode**, automatically fetching a random fact based on your chosen category.
* Switch to **Custom Mode** to enter your own number/date/year and get a specific fact.

### Tech Stack

* **Frontend:** HTML, CSS (custom styling), EJS templates
* **Backend:** Node.js, Express
* **HTTP Client:** Axios
* **API Used:** [Numbers API](http://numbersapi.com)

### Installation & Usage

1. **Clone the repository**

   ```bash
   git clone https://github.com/Trikshala/math-mind.git
   cd math-mind
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the application**

   ```bash
   node index.js
   ```

4. **Open in your browser**
   Go to:

   ```
   http://localhost:3000
   ```
