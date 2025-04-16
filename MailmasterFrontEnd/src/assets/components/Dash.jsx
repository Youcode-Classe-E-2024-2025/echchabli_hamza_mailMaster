import { useState, useEffect } from "react";

export default function Dash() {
  const [newsletters, setNewsletters] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [subject, setSubject] = useState("");
  const [newsletterId, setNewsletterId] = useState("");
  const [campaignId, setCampaignId] = useState("");
  const [selectedSubscribers, setSelectedSubscribers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/newsletters")
      .then((res) => res.json())
      .then(setNewsletters);

    fetch("http://127.0.0.1:8000/api/subscribers")
      .then((res) => res.json())
      .then(setSubscribers);
  }, []);

  const createNewsletter = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/newsletters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject }),
    });
  };

  const createCampaign = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/campaigns/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject,
        newsletter_id: newsletterId,
        user_id: 1,
      }),
    });
  };

  const runCampaign = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/campaigns/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        campaign_id: campaignId,
        subscribers: selectedSubscribers,
      }),
    });
  };

  return (
    <div className="p-4 space-y-8">
      {/* Create Newsletter */}
      <form onSubmit={createNewsletter} className="space-y-2">
        <h2 className="text-xl font-bold">Créer une newsletter</h2>
        <input
          type="text"
          placeholder="Sujet"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border px-2 py-1"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
          Créer
        </button>
      </form>

      {/* Create Campaign */}
      <form onSubmit={createCampaign} className="space-y-2">
        <h2 className="text-xl font-bold">Créer une campagne</h2>
        <select
          value={newsletterId}
          onChange={(e) => setNewsletterId(e.target.value)}
          className="border px-2 py-1"
        >
          <option value="">Sélectionner une newsletter</option>
          {newsletters.map((n) => (
            <option key={n.id} value={n.id}>
              {n.subject}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-green-500 text-white px-4 py-1 rounded">
          Créer campagne
        </button>
      </form>

      {/* Run Campaign */}
      <form onSubmit={runCampaign} className="space-y-2">
        <h2 className="text-xl font-bold">Exécuter une campagne</h2>
        <input
          type="text"
          placeholder="ID de campagne"
          value={campaignId}
          onChange={(e) => setCampaignId(e.target.value)}
          className="border px-2 py-1"
        />
        <h3>Sélectionner les abonnés</h3>
        <div className="space-y-1">
          {subscribers.map((s) => (
            <label key={s.id} className="block">
              <input
                type="checkbox"
                onChange={(e) => {
                  const checked = e.target.checked;
                  setSelectedSubscribers((prev) =>
                    checked
                      ? [...prev, { id: s.id, name: s.name, email: s.email }]
                      : prev.filter((sub) => sub.id !== s.id)
                  );
                }}
              />
              {s.name} ({s.email})
            </label>
          ))}
        </div>
        <button type="submit" className="bg-purple-500 text-white px-4 py-1 rounded">
          Lancer campagne
        </button>
      </form>
    </div>
  );
}
