 const stripe = Stripe(
  "pk_test_51SB7d0AwY7ujXaVJxSrzMEWLsZoeI5yeHTTuiwzEIsc2bHLXrwtrh4JQJIF7xAuPb9XiMzTWtTzD6KPN8ppUniux00JniCa3nK",
);
const elements = stripe.elements();
const card = elements.create("card");
card.mount("#card-element");

// body: JSON.stringify({
//   ticket_id: "cmkulukwt00028sm0qr74qk17",
// }),

//  body: JSON.stringify({
//   bundle_id: "cmks4xiaf0000ngm0749kq5fl",
//   sugo_id: "aofuirh",
// }),

const button = document.querySelector("#submit");
const messageDiv = document.querySelector("#payment-message");
const postalCodeInput = document.querySelector("#postal-code");

button.addEventListener("click", async () => {
  try {
    const postalCode = postalCodeInput.value.trim();
    messageDiv.textContent = "Creating payment intent...";
    button.disabled = true;

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhenphZHVycmFobWFuMDAwQGdtYWlsLmNvbSIsInN1YiI6ImNta3dpY3lmdTAwMGQ0d20wM3d1eHVmcHkiLCJpYXQiOjE3Njk1MTMwOTgsImV4cCI6MTc2OTUxNjY5OH0.oPMLbJ71LzEtKieLqKBTy2nYEEvvWVCXZzZsV9bLqFA";

    const response = await fetch("http://localhost:4008/api/ticket/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: Bearer ${token},
      },
      body: JSON.stringify({
        ticket_id: "cmks7u33n0001cgm0wf2k7nk8",
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      messageDiv.textContent = `Error: ${
        data.message || "Failed to create payment intent."
      }`;
      console.error(data);
      button.disabled = false;
      return;
    }

    const clientSecret = data.data.client_secret;
    messageDiv.textContent = "Processing payment...";

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            address: {
              postal_code: postalCode,
            },
          },
        },
      },
    );

    if (error) {
      messageDiv.textContent = `Payment failed: ${error.message}`;
      console.error(error);
    } else if (paymentIntent.status === "succeeded") {
      messageDiv.textContent = "Payment succeeded! 🎉";
      console.log("PaymentIntent:", paymentIntent);
    } else {
      messageDiv.textContent = Payment status: ${paymentIntent.status};
    }
  } catch (err) {
    messageDiv.textContent = "A network error occurred. Please try again.";
    console.error("Fetch Error:", err);
  } finally {
    button.disabled = false;
  }
});
