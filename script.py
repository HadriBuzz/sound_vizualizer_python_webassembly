import matplotlib.pyplot as plt
import io
import base64
import numpy as np


def create_plot():
    # Generate random data
    x = np.arange(0, 10, 1)
    y = np.random.random(10)

    # Create a simple plot
    plt.figure()
    plt.plot(x, y)
    plt.title("Real-time Random Data Plot")

    # Save the plot to a bytes buffer
    buf = io.BytesIO()
    plt.savefig(buf, format="png")
    buf.seek(0)

    # Encode the bytes to base64 string
    img_base64 = base64.b64encode(buf.read()).decode("ascii")
    return img_base64


# Generate the plot and encode it as base64
img_data = create_plot()
