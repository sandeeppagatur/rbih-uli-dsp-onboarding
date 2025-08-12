import React, { useState } from "react";
import { saveCompany, uploadCompliance, addService } from "../api/api";

export default function MultiStepForm({ token }) {
  const [step, setStep] = useState(1);
  const [providerId, setProviderId] = useState(null);
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    cin: "",
    primaryContactName: "",
    primaryContactEmail: "",
    supportContactName: "",
    supportContactEmail: ""
  });
  const [complianceFiles, setComplianceFiles] = useState({});
  const [service, setService] = useState({
    name: "",
    status: "",
    prodUrl: "",
    uatUrl: "",
    prodIps: [],
    uatIps: [],
    authType: "",
    clientId: "",
    secretKey: "",
    demoVideoUrl: ""
  });
  const [serviceFiles, setServiceFiles] = useState({});

  // Handle file input change
  const handleFileChange = (e, setter) => {
    setter(prev => ({ ...prev, [e.target.name]: e.target.files[0] }));
  };

  // Step 1 submission
  const handleSaveCompany = async () => {
    const res = await saveCompany(companyInfo, token);
    const data = await res.json();
    if (data.id) {
      setProviderId(data.id);
      setStep(2);
    } else {
      alert("Error saving company info");
    }
  };

  // Step 2 submission
  const handleUploadCompliance = async () => {
    const res = await uploadCompliance(complianceFiles, token);
    if (res.ok) {
      setStep(3);
    } else {
      alert("Error uploading compliance docs");
    }
  };

  // Final submission
  const handleAddService = async () => {
    const res = await addService(providerId, service, serviceFiles, token);
    if (res.ok) {
      alert("Onboarding complete!");
    } else {
      alert("Error adding service");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      {step === 1 && (
        <div>
          <h3>Step 1: Company Information</h3>
          <input placeholder="Company Name" onChange={e => setCompanyInfo({ ...companyInfo, companyName: e.target.value })} />
          <input placeholder="CIN" onChange={e => setCompanyInfo({ ...companyInfo, cin: e.target.value })} />
          <input placeholder="Primary Contact Name" onChange={e => setCompanyInfo({ ...companyInfo, primaryContactName: e.target.value })} />
          <input placeholder="Primary Contact Email" type="email" onChange={e => setCompanyInfo({ ...companyInfo, primaryContactEmail: e.target.value })} />
          <input placeholder="Support Contact Name" onChange={e => setCompanyInfo({ ...companyInfo, supportContactName: e.target.value })} />
          <input placeholder="Support Contact Email" type="email" onChange={e => setCompanyInfo({ ...companyInfo, supportContactEmail: e.target.value })} />
          <br /><br />
          <button onClick={handleSaveCompany}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3>Step 2: Compliance Documents</h3>
          <label>VAPT Report</label>
          <input type="file" name="vaptReport" onChange={e => handleFileChange(e, setComplianceFiles)} />
          <label>Antimalware Report</label>
          <input type="file" name="antimalwareReport" onChange={e => handleFileChange(e, setComplianceFiles)} />
          <br /><br />
          <button onClick={() => setStep(1)}>Back</button>
          <button onClick={handleUploadCompliance}>Next</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3>Step 3: Services Provided</h3>
          <input placeholder="Service Name" onChange={e => setService({ ...service, name: e.target.value })} />
          
          <label>Postman Collection</label>
          <input type="file" name="postmanCollection" onChange={e => handleFileChange(e, setServiceFiles)} />

          <label>API Documentation</label>
          <input type="file" name="documentation" onChange={e => handleFileChange(e, setServiceFiles)} />

          <label>Status</label>
          <select onChange={e => setService({ ...service, status: e.target.value })}>
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Test">Test</option>
          </select>

          <input placeholder="Prod URL" onChange={e => setService({ ...service, prodUrl: e.target.value })} />
          <input placeholder="UAT URL" onChange={e => setService({ ...service, uatUrl: e.target.value })} />

          <input placeholder="Prod IP Addresses (comma-separated)" onChange={e => setService({ ...service, prodIps: e.target.value.split(",") })} />
          <input placeholder="UAT IP Addresses (comma-separated)" onChange={e => setService({ ...service, uatIps: e.target.value.split(",") })} />

          <label>Auth Type</label>
          <select onChange={e => setService({ ...service, authType: e.target.value })}>
            <option value="">Select Auth Type</option>
            <option value="OAuth2">OAuth2</option>
            <option value="API Key">API Key</option>
            <option value="Other">Other</option>
          </select>

          <input placeholder="Client ID" onChange={e => setService({ ...service, clientId: e.target.value })} />
          <input type="password" placeholder="Secret Key" onChange={e => setService({ ...service, secretKey: e.target.value })} />

          <input placeholder="Demo Video URL" onChange={e => setService({ ...service, demoVideoUrl: e.target.value })} />

          <br /><br />
          <button onClick={() => setStep(2)}>Back</button>
          <button onClick={handleAddService}>Submit All</button>
        </div>
      )}
    </div>
  );
}
