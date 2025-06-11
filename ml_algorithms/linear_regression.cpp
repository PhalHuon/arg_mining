#include <iostream>

#include <vector>

using namespace std;

// Function to calculate linear regression coefficients (a = intercept, b = slope)
void linearRegression(const vector<double>& x, const vector<double>& y, double& a, double& b) {
    int n = x.size();
    if (n != y.size() || n == 0) {
        cerr << "Invalid data sizes." << endl;
        return;
    }

    double sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;

    for (int i = 0; i < n; ++i) {
        sumX += x[i];
        sumY += y[i];
        sumXY += x[i] * y[i];
        sumX2 += x[i] * x[i];
    }

    double denominator = n * sumX2 - sumX * sumX;

    if (denominator == 0) {
        cerr << "Cannot compute linear regression (division by zero)." << endl;
        return;
    }

    b = (n * sumXY - sumX * sumY) / denominator;
    a = (sumY - b * sumX) / n;
}

int main() {
    // Sample data: x and y
    vector<double> x = {1, 2, 3, 4, 5};
    vector<double> y = {2, 4, 5, 4, 5};

    double a = 0.0, b = 0.0;
    linearRegression(x, y, a, b);

    cout << "Linear regression equation: y = " << a << " + " << b << "x" << endl;

    return 0;
}

// linear_regression.cpp
#include <iostream>
#include <fstream>
#include <vector>
#include <sstream>

using namespace std;

// Read CSV into X and y
void load_data(const string& filename, vector<double>& X, vector<double>& y) {
    ifstream file(filename);
    string line;

    getline(file, line); // skip header
    while (getline(file, line)) {
        stringstream ss(line);
        string value;
        vector<double> row;

        while (getline(ss, value, ',')) {
            row.push_back(stod(value));
        }

        if (row.size() == 2) {
            X.push_back(row[0]);
            y.push_back(row[1]);
        }
    }
}

void train_linear_regression(const vector<double>& X, const vector<double>& y, double& weight, double& bias, double lr = 0.01, int epochs = 1000) {
    int n = X.size();
    weight = 0.0;
    bias = 0.0;

    for (int i = 0; i < epochs; ++i) {
        double y_pred, dw = 0.0, db = 0.0;

        for (int j = 0; j < n; ++j) {
            y_pred = weight * X[j] + bias;
            dw += (y_pred - y[j]) * X[j];
            db += (y_pred - y[j]);
        }

        dw /= n;
        db /= n;

        weight -= lr * dw;
        bias -= lr * db;
    }
}

int main() {
    vector<double> X, y;
    load_data("data.csv", X, y);

    double w, b;
    train_linear_regression(X, y, w, b);

    cout << "Trained weight: " << w << endl;
    cout << "Trained bias: " << b << endl;

    return 0;
}

