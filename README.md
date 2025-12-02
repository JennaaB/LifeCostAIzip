# LifeCostAIzip

A lightweight toolkit and reference implementation for estimating cost-of-living and related metrics at the U.S. ZIP-code level using public data sources and small, explainable machine learning models.

Status: Draft • Early-stage

Badges
- License: MIT (update as needed)
- Build / CI: TBD
- Coverage: TBD

Table of Contents
- About
- Key features
- Quickstart
- Requirements
- Installation (local & Docker)
- Running the demo API
- CLI examples
- Project layout
- Data sources & connectors
- Model & training
- API reference
- Configuration
- Tests & quality
- Contributing
- Roadmap
- License
- Acknowledgements
- Contact

About
LifeCostAIzip produces comparable, explainable cost-of-living estimates and component breakdowns (housing, food, transportation, utilities, etc.) aggregated to ZIP code. It is intended as a lightweight research / prototype project that demonstrates data ingestion, feature engineering, simple ML modeling, and an API + demo for exploration.

Key features
- ZIP-level cost score and per-component breakdowns
- Pluggable data connectors to common public sources
- Lightweight training pipeline (scikit-learn / small neural net)
- REST API to serve predictions (single & batch)
- Small React-based demo for exploration
- Docker support for reproducible local runs

Quickstart (local)
1. Clone the repo
   git clone https://github.com/JennaaB/LifeCostAIzip.git
   cd LifeCostAIzip

2. Create and activate a Python virtual environment
   python -m venv .venv
   source .venv/bin/activate  # macOS / Linux
   .venv\Scripts\activate     # Windows (PowerShell/CMD)

3. Install dependencies
   pip install -r requirements.txt

4. Prepare example data and run the demo API (example scripts)
   python scripts/prepare_example_data.py
   python api/app.py

5. Open the demo in your browser at http://localhost:8000 (see api/README.md for details)

Requirements
- Python 3.9+
- Docker (optional, recommended for reproducible environment)
- Node 16+ (only if you want to run the web demo locally)

Docker
- Build:
  docker build -t lifecostaizip:dev .
- Run:
  docker run -p 8000:8000 lifecostaizip:dev

Project layout
- data/ — ingestion connectors, raw downloads, and preprocessing scripts
- configs/ — YAML configuration files and environment overrides
- train/ — training pipeline, model definitions, and utilities
- api/ — FastAPI/Flask app and prediction utilities
- web/ — React demo (static build assets)
- notebooks/ — exploratory notebooks and analysis
- scripts/ — helpful one-off scripts (example data preparation, migrations)
- tests/ — unit and integration tests

Data sources & connectors
This project is designed to combine multiple public datasets. Example connectors and recommended sources:
- ACS / U.S. Census (demographics, income, household composition)
- Zillow / public housing indices (rental and price data)
- Bureau of Labor Statistics (regional price data)
- Consumer Price Indices & local price surveys
- OpenStreetMap (amenities, transit, distance metrics)
- Local utility datasets where available

Model & architecture
- Model type: tabular model (scikit-learn gradient-boosting or small neural net)
- Inputs: engineered features aggregated to ZIP (housing indicators, local prices, demographic attributes, amenity counts, commute measures)
- Outputs:
  - Composite cost score (normalized index)
  - Component breakdowns (housing, food, transport, utilities)
- Explainability: feature importances, SHAP summaries, and per-prediction contribution breakdowns
- Artifacts: saved model binaries and a metrics report in train/output/

API reference (examples)
- GET /predict?zip=94103
  Returns a JSON payload:
  {
    "zip": "94103",
    "score": 124.5,
    "breakdown": { "housing": 68.4, "food": 26.7, "transport": 18.2, "utilities": 10.7 },
    "explain": { "top_features": [...] }
  }
- POST /batch_predict
  Accepts a JSON array of ZIP codes and returns an array of prediction objects.

CLI examples
- Train:
  python train/train.py --config configs/default.yaml
- Single predict:
  python api/predict.py --zip 10001
- Run tests:
  pytest -q

Configuration
- Config files live in configs/ (YAML)
- Environment variables can override config settings (API_HOST, API_PORT, DATA_PATH, MODEL_PATH, etc.)
- Example: to run with a custom config:
  python train/train.py --config configs/production.yaml

Testing & quality
- Unit tests: pytest
- Linting & formatting:
  - black .
  - flake8
- CI: add a GitHub Actions workflow to run tests and linters on PRs (TBD)

Contributing
Contributions are welcome. Please:
1. Open an issue to discuss large changes or features first.
2. Create a branch per feature/fix: git checkout -b feat/your-feature
3. Keep commits small and focused; add tests for new behavior.
4. Submit a PR against main (include testing steps and a brief description).
See CONTRIBUTING.md for more details and the code style guide.

Roadmap (example)
- [ ] Add more robust connectors for Zillow (rent index) and BLS local prices
- [ ] Expand unit/integration tests and CI coverage
- [ ] Add production-grade model versioning and artifact storage
- [ ] Improve web demo: map visualization and comparison tools
- [ ] Add authentication & rate-limiting for the API

Security & data privacy
- This project uses publicly available datasets; please respect datasets' licensing and usage terms.
- Do not include PII in data uploads. If you add private datasets, follow your organization’s data-handling policies.

License
This repository is provided under the MIT License. Update LICENSE if you prefer a different license.

Acknowledgements
Thanks to the authors and maintainers of the public datasets and open-source libraries used in this project.

Contact / Maintainer
- GitHub: @JennaaB
- For issues and feature requests: open an issue in this repository.

If you'd like, I can:
- Convert this into a committed README.md in your repo,
- Or open a pull request with this file and an optional changelog entry.

Please tell me how you'd like to proceed (I can provide the exact git commands or prepare the PR content for you).
