# LIME-only Explanation Script for Severe Class Visualization

## Summary
Modified the `get_explanations.py` script to focus exclusively on LIME (Local Interpretable Model-agnostic Explanations) visualization for severe pharyngeal residue class samples, as requested by the user.

## Changes Made
- **Simplified script to LIME-only**: Removed SHAP and Grad-CAM implementations to focus solely on LIME visualization
- **Severe class sample selection**: Added `find_severe_samples()` function to automatically locate and use samples with "severe_pharyngeal_residue_in_valleculae" label (label 1)
- **Improved error handling**: Added proper exception handling for missing files and edge cases
- **Clean output**: Streamlined console output and visualization generation

## Key Features
- Automatically finds severe class samples from test data
- Generates clear LIME explanations with original image and highlighted important regions
- Saves visualization as `lime_output.png`
- Provides detailed console output showing sample selection and prediction confidence

## Files Modified
- `get_explanations.py`: Main script simplified to LIME-only approach
- `test_explanations.py`: Mock data generation script for testing
- `requirements.txt`: Dependencies list

## Testing
- Successfully tested with mock data showing 27 severe class samples
- LIME visualization generates correctly without errors
- Script properly identifies and uses severe class samples instead of defaulting to index 0

## Usage
```bash
python test_explanations.py  # Generate mock data (if needed)
python get_explanations.py   # Generate LIME explanation for severe class
```

## Output
The script generates a LIME visualization showing:
- Original image on the left
- LIME explanation highlighting important regions on the right
- Prediction confidence and class information in the title

Link to Devin run: https://app.devin.ai/sessions/ccd49116ccc344c1970d6378c64c51aa
Requested by: tokuma (subacco918@gmail.com)

![LIME Output Example](lime_output.png)
