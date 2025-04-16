import React, { useEffect, useState } from "react";

  let url = import.meta.env.VITE_API_URL;

export default function Dash() {
  // States for newsletters, campaigns, subscribers
  const [newsletters, setNewsletters] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  
  // States for creating newsletters
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [template, setTemplate] = useState("");
  
  // States for creating campaigns
  const [subject, setSubject] = useState("");
  const [newsletterId, setNewsletterId] = useState("");
  
  // States for running campaigns
  const [campaignId, setCampaignId] = useState("");
  const [selectedSubs, setSelectedSubs] = useState([]);
  
  // States for UI
  const [activeTab, setActiveTab] = useState("newsletters");
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  const [subscribersEmails, setSubscribersEmails] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSubscribers = async (campaignId) => {
    console.log("Fetching subscribers for campaign ID:", campaignId);
    
    try {
      
      // setLoading(true);

      const res = await fetch(`http://127.0.0.1:8000/api/campaigns/emails/${campaignId}`);
      
      console.log(res.status);
  
      if (!res.ok) {

        throw new Error("Network response was not ok");

      }

      console.log(res);
      
      const data = await res.json();
      
      setSubscribersEmails(data);

      setLoading(true)

    } catch (err) {
      console.error("Failed to fetch subscribers", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabClick = (campaignId) => {
    setActiveTab(campaignId);
    fetchSubscribers(campaignId);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [newslettersRes, subscribersRes, campaignsRes] = await Promise.all([
        fetch("http://127.0.0.1:8000/api/newsletters").then(res => res.json()),
        fetch("http://127.0.0.1:8000/api/subscribers").then(res => res.json()),
        fetch("http://127.0.0.1:8000/api/campaigns").then(res => res.json())
      ]);
      
      setNewsletters(newslettersRes);
      setSubscribers(subscribersRes);
      setCampaigns(campaignsRes);
    } catch (error) {
      showNotification("Failed to load data. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };


  const createNewsletter = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch("http://127.0.0.1:8000/api/newsletters/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, template , user_id : localStorage.getItem('user_id')})
      });
      
      if (!response.ok) throw new Error("Failed to create newsletter");
      
      // Clear form and refresh data
      setTitle("");
      setContent("");
      setTemplate("");
      fetchData();
    } catch (error) {
      console.log(error );
      
    } finally {
      setIsLoading(false);
    }
  };

  const createCampaign = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch("http://127.0.0.1:8000/api/campaigns/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, newsletter_id: newsletterId  , user_id : localStorage.getItem('user_id')})
      });
      
      if (!response.ok) throw new Error("Failed to create campaign");
      
      // Clear form and refresh data
      setSubject("");
      setNewsletterId("");
      fetchData();
    } catch (error) {
      showNotification("Failed to create campaign. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const runCampaign = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const selectedSubscribers = selectedSubs.map(id => {
        const sub = subscribers.find(s => s.id === parseInt(id));
        return { id: sub.id, name: sub.name, email: sub.email };
      });
      
      const response = await fetch("http://127.0.0.1:8000/api/campaigns/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaign_id: campaignId,
          subscribers: selectedSubscribers
        })
      });
      
      if (!response.ok) throw new Error("Failed to run campaign");
      
      // Clear form and refresh data
      setCampaignId("");
      setSelectedSubs([]);
      fetchData();
     
    } catch (error) {
     
    } finally {
      setIsLoading(false);
    }
  };

  const deleteNewsletter = async (id) => {
    if (window.confirm("Are you sure you want to delete this newsletter?")) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/newsletters/${id}`, {
          method: "DELETE"
        });
        
        if (!response.ok) throw new Error("Failed to delete newsletter");
        
        fetchData();
        showNotification("Newsletter deleted successfully!");
      } catch (error) {
        showNotification("Failed to delete newsletter.", "error");
      }
    }
  };

  const deleteCampaign = async (id) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/campaigns/${id}`, {
          method: "DELETE"
        });
        
        if (!response.ok) throw new Error("Failed to delete campaign");
        
        fetchData();
        showNotification("Campaign deleted successfully!");
      } catch (error) {
        showNotification("Failed to delete campaign.", "error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Newsletter Dashboard</h1>
          <p className="mt-2 opacity-90">Manage your newsletters, campaigns, and subscribers</p>
        </div>
      </div>

      {/* Notification */}
      {notification.show && (
        <div 
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
            notification.type === "error" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab("newsletters")}
              className={`px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                activeTab === "newsletters" ? "border-blue-600 text-blue-600" : "border-transparent"
              }`}
            >
              Newsletters
            </button>
            <button
              onClick={() => setActiveTab("campaigns")}
              className={`px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                activeTab === "campaigns" ? "border-blue-600 text-blue-600" : "border-transparent"
              }`}
            >
              Campaigns
            </button>
            <button
              onClick={() => setActiveTab("subscribers")}
              className={`px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                activeTab === "subscribers" ? "border-blue-600 text-blue-600" : "border-transparent"
              }`}
            >
              Subscribers ({subscribers.length})
            </button>
            <button
              onClick={() => setActiveTab("emails")}
              className={`px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                activeTab === "subscribers" ? "border-blue-600 text-blue-600" : "border-transparent"
              }`}
            >
              Track Emails ({subscribers.length})
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        {/* Newsletters Tab */}
        {activeTab === "newsletters" && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Create Newsletter</h2>
              <form onSubmit={createNewsletter} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Newsletter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <textarea
                    id="content"
                    placeholder="Newsletter content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="template" className="block text-sm font-medium text-gray-700 mb-1">
                    Template
                  </label>
                  <select
                    id="template"
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="" disabled>Select a template</option>
                    <option value="discount">Discount</option>
                    <option value="new_product">New Product</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating..." : "Create Newsletter"}
                </button>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <h2 className="text-xl font-semibold p-6 border-b">Your Newsletters</h2>
              {newsletters.length === 0 ? (
                <p className="p-6 text-gray-500">No newsletters created yet.</p>
              ) : (
                <div className="divide-y">
                  {newsletters.map((newsletter) => (
                    <div key={newsletter.id} className="p-6 flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{newsletter.title}</h3>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full mr-2">
                            {newsletter.template || "No template"}
                          </span>
                          <span>{new Date(newsletter.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => deleteNewsletter(newsletter.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Campaigns Tab */}
        {activeTab === "campaigns" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Create Campaign Form */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Create Campaign</h2>
                <form onSubmit={createCampaign} className="space-y-4">
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject Line
                    </label>
                    <input
                      id="subject"
                      type="text"
                      placeholder="Email subject line"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="newsletterId" className="block text-sm font-medium text-gray-700 mb-1">
                      Newsletter
                    </label>
                    <select
                      id="newsletterId"
                      value={newsletterId}
                      onChange={(e) => setNewsletterId(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select a newsletter</option>
                      {newsletters.map((newsletter) => (
                        <option key={newsletter.id} value={newsletter.id}>
                          {newsletter.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating..." : "Create Campaign"}
                  </button>
                </form>
              </div>

              {/* Run Campaign Form */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Run Campaign</h2>
                <form onSubmit={runCampaign} className="space-y-4">
                  <div>
                    <label htmlFor="campaignId" className="block text-sm font-medium text-gray-700 mb-1">
                      Campaign
                    </label>
                    <select
                      id="campaignId"
                      value={campaignId}
                      onChange={(e) => setCampaignId(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select a campaign</option>
                      {campaigns.map((campaign) => (
                        <option key={campaign.id} value={campaign.id}>
                          {campaign.subject}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="selectedSubs" className="block text-sm font-medium text-gray-700 mb-1">
                      Select Subscribers
                    </label>
                    <select
                      id="selectedSubs"
                      multiple
                      size={5}
                      value={selectedSubs}
                      onChange={(e) => setSelectedSubs([...e.target.selectedOptions].map(o => o.value))}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      {subscribers.map((subscriber) => (
                        <option key={subscriber.id} value={subscriber.id}>
                          {subscriber.name} ({subscriber.email})
                        </option>
                      ))}
                    </select>
                    <p className="text-sm text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple subscribers</p>
                  </div>

                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    disabled={isLoading}
                  >
                    {isLoading ? "Launching..." : "Launch Campaign"}
                  </button>
                </form>
              </div>
            </div>

            {/* Campaigns List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <h2 className="text-xl font-semibold p-6 border-b">Your Campaigns</h2>
              {campaigns.length === 0 ? (
                <p className="p-6 text-gray-500">No campaigns created yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subject
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Newsletter
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Created
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {campaigns.map((campaign) => (
                        <tr key={campaign.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium">{campaign.subject}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              campaign.status === 'ongoing' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {campaign.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {newsletters.find(n => n.id === campaign.newsletter_id)?.title || 'Unknown'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(campaign.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button
                              onClick={() => deleteCampaign(campaign.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "subscribers" && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <h2 className="text-xl font-semibold p-6 border-b">Your Subscribers</h2>
            {subscribers.length === 0 ? (
              <p className="p-6 text-gray-500">No subscribers yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Joined
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {subscribers.map((subscriber) => (
                      <tr key={subscriber.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium">{subscriber.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {subscriber.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(subscriber.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}



        { activeTab === "emails" && (
              <div>
               <div className="flex border-b">
                 {campaigns.map((campaign) => (
                   <button
                     key={campaign.id}
                     onClick={() => handleTabClick(campaign.id)}
                     className={`px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                       activeTab === campaign.id
                         ? "border-blue-600 text-blue-600"
                         : "border-transparent"
                     }`}
                   >
                     {campaign.subject}
                   </button>
                 ))}
               </div>
         
               {activeTab && (
                 <div className="bg-white rounded-lg shadow overflow-hidden mt-4">
                   <h2 className="text-xl font-semibold p-6 border-b">
                     Subscribers for Campaign #{activeTab}
                   </h2>
         
                   {loading ? (
                     <p className="p-6 text-gray-500">Loading...</p>
                   ) : subscribers.length === 0 ? (
                     <p className="p-6 text-gray-500">No subscribers yet.</p>
                   ) : (
                     <div className="overflow-x-auto">
                       <table className="min-w-full divide-y divide-gray-200">
                         <thead className="bg-gray-50">
                           <tr>
                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Opened</th>
                           </tr>
                         </thead>
                         <tbody className="bg-white divide-y divide-gray-200">
                           {subscribersEmails.map((sub) => (
                             <tr key={sub.id}>
                               <td className="px-6 py-4 whitespace-nowrap">{sub.name}</td>
                               <td className="px-6 py-4 whitespace-nowrap">{sub.email}</td>
                               <td className="px-6 py-4 whitespace-nowrap">
                                 {sub.opened ? (
                                   <span className="text-green-600">✅ Opened</span>
                                 ) : (
                                   <span className="text-gray-500">❌ Not Opened</span>
                                 )}
                               </td>
                             </tr>
                           ))}
                         </tbody>
                       </table>
                     </div>
                   )}
                 </div>
               )}
             </div>
           )
        }
      </div>
    </div>
  );


}