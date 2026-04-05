# CertAI-Nexus

<div align="center">
  <p><strong>A comprehensive AI-powered document verification platform that integrates with DigiLocker for seamless certificate validation.</strong></p>
  

</div>

## ✨ Features

*   **AI-Powered Verification:** Advanced machine learning algorithms verify documents with high accuracy in seconds.
*   **DigiLocker Integration:** Seamlessly connect with government-verified documents through DigiLocker API.
*   **User & HR Dashboards:** Separate interfaces for employees and HR personnel to manage document requests and verification status.
*   **Real-Time Results:** Get instant verification results with confidence scores and detailed analysis.
*   **Secure Authentication:** JWT-based authentication with role-based access control (RBAC).

## 🛠️ Tech Stack

### Backend
*   **Python (Django):** Robust web framework for server-side logic and API management.
*   **LangChain:** Framework for AI-powered document processing and analysis.
*   **Google AI Generative Language:** For advanced AI document analysis.
*   **MySQL:** Relational database for structured data storage (via `mysqlclient`).
*   **JWT Authentication:** Secure token-based authentication.

### Frontend
*   **HTML5 & CSS3:** Semantic markup and modern styling.
*   **JavaScript:** Interactive UI logic.
*   **Tailwind CSS:** Utility-first CSS framework for rapid UI development.

## 📋 Prerequisites

*   Python 3.8 or higher
*   Node.js 16 or higher (for Tailwind compilation)
*   MySQL Server
*   pip package manager

## 🚀 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com
    cd CertAI-Nexus
    ```

2.  **Create a Virtual Environment:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3.  **Install Python Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure MySQL Database:**
    *   Create a new MySQL database (`certai_db`).
    *   Update `certai_nexus/settings.py` with your MySQL credentials:
        ```python
        DATABASES = {
            'default': {
                'ENGINE': 'django.db.backends.mysql',
                'NAME': 'certai_db',
                'USER': 'your_user',
                'PASSWORD': 'your_password',
                'HOST': 'localhost',
                'PORT': '3306',
            }
        }
        ```

5.  **Run Database Migrations:**
    ```bash
    python manage.py migrate
    ```

6.  **Create Superuser (for HR Admin):**
    ```bash
    python manage.py createsuperuser
    ```

7.  **Run the Backend Server:**
    ```bash
    python manage.py runserver
    ```

8.  **Setup Frontend (Tailwind/JS):**
    *   Navigate to the frontend directory and install dependencies if necessary.


Project Link: [https://github.com](https://github.com)
