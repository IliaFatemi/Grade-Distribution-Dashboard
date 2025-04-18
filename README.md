# 📊 Grade Distribution Dashboard

A web-based visualization tool for analyzing student grades. This dashboard lets you upload a `.csv` file with student names and scores, then automatically calculates statistics (mean, median, highest, lowest) and visualizes the grade distribution as a histogram. You can also customize grade boundaries and reset them to defaults.

---

## 🚀 Features

- 📁 Upload CSV file with student names and grades
- 📊 View histogram of grade distribution by letter grade
- 🧠 See calculated statistics:
  - Highest score and student
  - Lowest score and student
  - Mean (average) grade
  - Median grade
- 🛠️ Customize grade boundaries (A+, A, A-, ..., F)
- 🔄 Reset thresholds to default values

---

## 📝 CSV Format

- The first row is treated as the header and ignored.
- Grades should be numeric and between 0–100.

The uploaded file must follow this format:

Name, Percent <br>
Alice, 85.3 <br>
Bob, 76.4 <br>
Charlie, 91.8 <br>...

---

## 📁 Project Structure

```
Grade-Dashboard/ 
├── index.html # Main HTML structure 
├── calculate.js # JavaScript for logic and interactivity 
├── histogram.css # CSS styles 
└── data.csv # Sample data (optional for testing)
```

---

## 🧪 How to Use

1. **Download or clone this repository**
2. **Open `index.html`** in your preferred web browser
3. **Click "Choose File"** and upload your CSV file
4. The dashboard will:
   - Display the file name
   - Populate statistics
   - Generate a histogram
5. **Adjust grade boundaries** using the input boxes
6. **Click "Reset values"** to restore original grade thresholds

---

## 📌 Default Grade Thresholds

| Grade | Lower Bound (%) |
|-------|------------------|
| A+    | 95               |
| A     | 90               |
| A-    | 85               |
| B+    | 80               |
| B     | 75               |
| B-    | 70               |
| C+    | 65               |
| C     | 60               |
| C-    | 55               |
| D     | 50               |
| F     | 0                |

These can be changed in the interface or via the code.

---

## 🧰 Built With

- HTML5
- CSS3
- JavaScript (Vanilla)

No external libraries or frameworks required. Everything runs in the browser — no server setup necessary.

---

## 📜 License

This project is open-source and free to use.