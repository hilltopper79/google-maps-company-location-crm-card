import { Button, Text, Box, Flex, hubspot } from "@hubspot/ui-extensions";
import { GOOGLE_MAPS_API_KEY } from "./config.js";

hubspot.extend(({ actions, context }) => <Extension actions={actions} context={context} />);

const Extension = ({ actions, context }) => {
  const handleClick = async () => {
    try {
      const hs_object_id = context?.crm?.objectId;
      if (!hs_object_id) {
        throw new Error("No company ID found in context.");
      }

      console.log("Calling serverless function with name:", "getAddress");
      console.log("Company ID being sent:", hs_object_id);

      // Call the serverless function
      const response = await hubspot
        .serverless("getAddress", {
          propertiesToSend: ["hs_object_id"],
          parameters: { }
        });

      console.log("Serverless function response:", response);

      if (response.status !== "SUCCESS") {
        throw new Error(response.message || "Serverless function failed.");
      }

      const { address, city, state, zip } = response.data;
      if (!address || !city || !state || !zip) {
        throw new Error("Address information is incomplete.");
      }

      // Construct Google Maps URL
      const encodedAddress = encodeURIComponent(`${address}, ${city}, ${state} ${zip}`);
      const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodedAddress}`;

      // Open iFrame with map
      actions.openIframeModal({
        uri: googleMapsUrl,
        height: 1000,
        width: 1000,
        title: "Company Location",
        flush: true,
      });

    } catch (error) {
      console.error("Error fetching company address:", error);
      actions.addAlert({
        message: `Error fetching address: ${error.message}`,
        type: "DANGER",
      });
    }
  };

  return (
    <Flex direction="column" align="start" gap="medium">
      <Text>Click below to view this company's location in Google Maps:</Text>
      <Box>
        <Button type="submit" onClick={handleClick}>Show Location on Map</Button>
      </Box>
    </Flex>
  );
};