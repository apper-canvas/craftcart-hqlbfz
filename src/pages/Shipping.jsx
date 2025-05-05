const Shipping = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 dark:text-white">Shipping Policy</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Last Updated: June 1, 2023
        </p>

        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">1. Processing Times</h2>
            <p className="mb-4">
              At CraftCart, we work with individual artisans who handcraft each item. Because of the handmade nature of our products, 
              processing times may vary depending on the item and the artisan's current workload.
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">
                <strong>Ready-to-Ship Items:</strong> Products that are already crafted and ready to ship typically process within 1-3 
                business days.
              </li>
              <li className="mb-2">
                <strong>Made-to-Order Items:</strong> Products that are created after you place your order may take 3-14 business days 
                to process, depending on the complexity of the item.
              </li>
              <li>
                <strong>Custom Orders:</strong> For personalized or custom-designed products, processing times will be communicated 
                during the ordering process and may range from 2-4 weeks.
              </li>
            </ul>
            <p>
              The estimated processing time for each product is listed on the product page. Once your order has been processed and 
              shipped, you will receive a shipping confirmation email with tracking information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">2. Shipping Methods and Delivery Times</h2>
            <p className="mb-4">
              We offer several shipping options to meet your needs:
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-surface-700">
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Shipping Method</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Estimated Delivery Time*</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Standard Shipping</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">5-7 business days</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">$5.99 (Free on orders over $75)</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-surface-800">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Expedited Shipping</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">2-3 business days</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">$12.99</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">International Shipping</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">10-21 business days</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Varies by country ($15.99 - $49.99)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm italic mb-4">
              * Delivery times are estimates and begin once your order has been processed and shipped. Delivery times do not include 
              processing times.
            </p>
            <p>
              Shipping costs are calculated based on the delivery address, package weight, and the shipping method selected during 
              checkout. We currently ship to most countries worldwide, though some restrictions may apply.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">3. Order Tracking</h2>
            <p className="mb-4">
              Once your order has been shipped, you will receive a shipping confirmation email with a tracking number. You can track 
              your order by:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Clicking the tracking link in your shipping confirmation email</li>
              <li className="mb-2">Logging into your CraftCart account and viewing your order history</li>
              <li>Contacting our customer support team with your order number</li>
            </ul>
            <p>
              Please note that some international shipments may have limited tracking information depending on the postal service in the 
              destination country.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">4. International Shipping</h2>
            <p className="mb-4">
              For international orders, please be aware of the following:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">
                <strong>Customs Duties and Taxes:</strong> International shipments may be subject to import duties, taxes, and customs 
                processing fees. These charges are the responsibility of the recipient and are not included in our shipping costs.
              </li>
              <li className="mb-2">
                <strong>Customs Processing:</strong> International orders may experience delays due to customs processing in the 
                destination country, which is beyond our control.
              </li>
              <li className="mb-2">
                <strong>Address Accuracy:</strong> Please ensure your shipping address is complete and accurate, including any necessary 
                postal codes or apartment numbers. We are not responsible for delays or non-delivery due to incorrect address information.
              </li>
              <li>
                <strong>Restricted Items:</strong> Some products may not be eligible for international shipping due to country-specific 
                import restrictions. If this affects your order, we will notify you.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">5. Shipping Delays and Issues</h2>
            <p className="mb-4">
              While we strive to deliver all orders on time, occasional delays may occur due to factors beyond our control, such as:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Weather conditions or natural disasters</li>
              <li className="mb-2">Carrier delays or service disruptions</li>
              <li className="mb-2">Customs processing for international shipments</li>
              <li>High volume periods (e.g., holiday seasons)</li>
            </ul>
            <p>
              If there is a significant delay with your order, we will attempt to notify you as soon as possible. If you have concerns 
              about a delayed shipment, please contact our customer support team.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">6. Damaged or Lost Shipments</h2>
            <p className="mb-4">
              If your package arrives damaged or is lost during transit:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">
                <strong>Damaged Items:</strong> If your item arrives damaged, please contact us within 48 hours of delivery with photos 
                of the damaged package and product. We will work with you to resolve the issue.
              </li>
              <li>
                <strong>Lost Packages:</strong> If your tracking information indicates delivery but you haven't received your package, 
                or if your package appears to be lost in transit, please contact us within 7 days for domestic shipments or 21 days for 
                international shipments from the expected delivery date.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">7. Our Sustainability Commitment</h2>
            <p className="mb-4">
              At CraftCart, we are committed to reducing the environmental impact of our shipping practices:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">We use recycled and biodegradable packaging materials whenever possible</li>
              <li className="mb-2">We consolidate items from the same order to reduce packaging waste</li>
              <li className="mb-2">We partner with carbon-neutral shipping providers when available</li>
              <li>We optimize shipping routes to reduce carbon emissions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">8. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about our shipping policy or need assistance with a specific order, please contact our customer 
              support team:
            </p>
            <p className="mb-2">Email: support@craftcart.com</p>
            <p className="mb-2">Phone: (800) 555-1234</p>
            <p>Our customer support hours are Monday through Friday, 9 AM to 5 PM EST.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Shipping;