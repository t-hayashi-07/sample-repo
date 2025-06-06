import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
import os

def create_mock_data():
    """Create mock data for testing."""
    x_test = np.random.rand(100, 64, 64, 3).astype(np.float32)
    
    y_test = np.random.choice([0, 1], size=100, p=[0.7, 0.3])  # 30% severe cases
    
    y_test[0] = 1
    
    return x_test, y_test

def create_mock_model():
    """Create a simple mock model for testing."""
    model = Sequential([
        Conv2D(32, (3, 3), activation='relu', input_shape=(64, 64, 3)),
        MaxPooling2D((2, 2)),
        Conv2D(64, (3, 3), activation='relu'),
        MaxPooling2D((2, 2)),
        Flatten(),
        Dense(64, activation='relu'),
        Dense(2, activation='softmax')
    ])
    
    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
    return model

def main():
    """Create mock data and model for testing."""
    print("Creating mock data and model for testing...")
    
    os.makedirs("data", exist_ok=True)
    
    x_test, y_test = create_mock_data()
    np.save("./data/x_test.npy", x_test)
    np.save("./data/y_test.npy", y_test)
    
    model = create_mock_model()
    model.save("trained_model.h5")
    
    print(f"Created mock data: {x_test.shape} images, {np.sum(y_test == 1)} severe cases")
    print("Mock files created successfully!")
    print("You can now run: python get_explanations.py")

if __name__ == "__main__":
    main()
