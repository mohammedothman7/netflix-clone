import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, update } from "../features/userSlice";
import { loadStripe } from "@stripe/stripe-js";
import { setLoading } from "../features/loadingSlice";
import db from "../firebase";

import "../css/Plans.css";

function Plans() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          dispatch(
            update({
              role: subscription.data().role,
              current_period_end: subscription.data().current_period_end
                .seconds,
              current_period_start: subscription.data().current_period_start
                .seconds,
            })
          );
        });
      });
  }, [dispatch, user.uid]);

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach(
            (price) =>
              (products[productDoc.id].prices = {
                priceId: price.id,
                priceData: price.data(),
              })
          );
        });
        setProducts(products);
      });
  }, []);

  const loadCheckout = async (priceId) => {
    dispatch(setLoading(true));
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        alert(`An error occured: ${error.message}`);
      }

      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51IJTwiGEYst3dLCJVECF1R1le9Bl0XQJh1cRDoXzMKxWNCgtfXOunNZf4Z1gjJFk26VlxqCutqpDsQFWks4K58LZ00dolA8VnP"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="plans">
      {user?.role && (
        <p>
          Renewal Date:{" "}
          {new Date(user?.current_period_end * 1000).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(user?.role);

        return (
          <div
            className={`${
              isCurrentPackage && "plans__plan--disabled"
            } plans__plan`}
            key={productId}
          >
            <div className="plans__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
              disabled={isCurrentPackage}
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Plans;
