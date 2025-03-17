const hubspot = require('@hubspot/api-client');

exports.main = async (context) => {
  try {
    console.log("Serverless function triggered.");
    console.log("Context received:", JSON.stringify(context, null, 2));

    const { hs_object_id } = context.propertiesToSend || {};
    if (!hs_object_id) {
      throw new Error("Missing required parameter: companyId");
    }

    console.log("Fetching data for companyId:", hs_object_id); 

    // Fetch company details from HubSpot CRM
    const response = await fetch(
      `https://api.hubapi.com/crm/v3/objects/companies/${hs_object_id}?properties=address,city,state,zip`,
      {
        headers: {
          Authorization: `Bearer pat-na1-b33e3a18-1206-4b20-8f9d-19345e563b7c`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("HubSpot API response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error fetching company data: ${errorText}`);
    }

    const companyData = await response.json();
    console.log("Company data received:", JSON.stringify(companyData, null, 2));

    const { address, city, state, zip } = companyData.properties || {};
    if (!address || !city || !state || !zip) {
      throw new Error("Company address information is incomplete.");
    }

    console.log("Returning successful response.");
    return {
      status: "SUCCESS",
      data: { address, city, state, zip },
    };

  } catch (error) {
    console.error("Error in serverless function:", error);
    return {
      status: "ERROR",
      message: error.message,
    };
  }
};
