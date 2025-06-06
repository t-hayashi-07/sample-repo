import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
from lime import lime_image
from skimage.segmentation import mark_boundaries

classes = ["no_pharyngeal_residue_in_valleculae", "severe_pharyngeal_residue_in_valleculae"]

def find_severe_samples(y_test, num_samples=5):
    """Find indices of samples with severe class label (label 1)."""
    severe_indices = np.where(y_test == 1)[0]
    if len(severe_indices) == 0:
        raise ValueError("No severe class samples found in the test data")
    return severe_indices[:num_samples]

def generate_lime_explanation(input_image, model, prediction, label, classes, save_path="lime_output.png"):
    """Generate LIME explanation for the input image."""
    explainer = lime_image.LimeImageExplainer()
    
    def predict_fn(x):
        return model.predict(x, verbose=0)
    
    explanation = explainer.explain_instance(
        input_image,
        predict_fn,
        top_labels=2,
        hide_color=0,
        num_samples=1000
    )
    
    temp, mask = explanation.get_image_and_mask(
        explanation.top_labels[0],
        positive_only=True,
        num_features=5,
        hide_rest=True
    )
    
    fig, axes = plt.subplots(1, 2, figsize=(10, 5))
    
    axes[0].imshow(input_image)
    axes[0].set_title("Original Image")
    axes[0].axis("off")
    
    axes[1].imshow(mark_boundaries(temp, mask))
    axes[1].set_title("LIME Explanation")
    axes[1].axis("off")
    
    plt.suptitle(f"Prediction: {classes[np.argmax(prediction)]} ({np.round(np.max(prediction), 2)*100.0}%)", fontsize=16)
    plt.tight_layout()
    plt.savefig(save_path)
    plt.show()

def main():
    """Main function to load model, find severe samples, and generate LIME explanation."""
    try:
        model = tf.keras.models.load_model('trained_model.h5')
        x_test = np.load("./data/x_test.npy")
        y_test = np.load("./data/y_test.npy")
        
        severe_indices = find_severe_samples(y_test, num_samples=1)
        sample_idx = severe_indices[0]
        
        sample = np.expand_dims(x_test[sample_idx], axis=0)
        print(f"Selected sample shape: {np.shape(sample)}")
        print(f"Sample index: {sample_idx}")
        
        prediction = model.predict(sample)
        label = y_test[sample_idx]
        
        print(f"The actual class is '{classes[label]}'.")
        print(f"The model predicts the class '{classes[np.argmax(prediction)]}' with {np.round(np.max(prediction), 2)*100.0}% confidence")
        
        input_image = sample[0]
        print("Generating LIME explanation...")
        generate_lime_explanation(input_image, model, prediction, label, classes, "lime_output.png")
        
        print("LIME explanation generated successfully!")
        
    except FileNotFoundError as e:
        print(f"Error: Required file not found - {e}")
        print("Please ensure 'trained_model.h5' and data files exist in the correct locations.")
    except ValueError as e:
        print(f"Error: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")

if __name__ == "__main__":
    main()
