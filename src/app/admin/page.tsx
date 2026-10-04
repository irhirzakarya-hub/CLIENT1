"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Loader2, UploadCloud, Plus, Trash2, Link } from "lucide-react";

export default function AdminPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        setMessage("Erreur lors du chargement des données.");
        setLoading(false);
      });
  }, []);

  const handleChange = (section: string, field: string, value: string | number) => {
    setData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      let finalData = { ...data };

      // 1. Upload Logo if changed
      if (logoFile) {
        const formData = new FormData();
        formData.append("logo", logoFile);
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const uploadResult = await uploadRes.json();
        if (uploadResult.success) {
          finalData.logo = uploadResult.url;
        } else {
          setMessage("Erreur lors du téléchargement du logo.");
          setSaving(false);
          return;
        }
      }

      // 2. Save JSON Data
      const res = await fetch("/api/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      const result = await res.json();
      if (result.success) {
        setMessage("Les informations ont été mises à jour avec succès !");
        setData(finalData); // update local state with new logo url if any
      } else {
        setMessage("Erreur lors de la mise à jour des informations.");
      }
    } catch (err) {
      setMessage("Une erreur s'est produite.");
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white"><Loader2 className="animate-spin w-8 h-8 text-amber-500" /></div>;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8 font-sans selection:bg-amber-500 selection:text-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center text-black">A</div>
          Administration - Marios Car
        </h1>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 space-y-8">
          
          {/* Logo Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-amber-400">Changer le Logo</h2>
            <div className="flex items-center gap-6">
              <img src={data.logo} alt="Logo" className="w-24 h-24 object-cover rounded-full border-2 border-zinc-800 bg-zinc-950" />
              <label className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 cursor-pointer rounded-lg transition border border-zinc-700">
                <UploadCloud className="w-5 h-5" />
                Choisir une image
                <input type="file" accept="image/*" className="hidden" onChange={(e) => setLogoFile(e.target.files?.[0] || null)} />
              </label>
              {logoFile && <span className="text-sm text-green-400">Nouveau logo sélectionné : {logoFile.name}</span>}
            </div>
          </section>

          <hr className="border-zinc-800" />

          {/* General Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-amber-400">Informations Générales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Nom Commercial</label>
                <input type="text" value={data.general.nomCommercial} onChange={(e) => handleChange("general", "nomCommercial", e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition" />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Activité</label>
                <input type="text" value={data.general.activite} onChange={(e) => handleChange("general", "activite", e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition" />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Ville</label>
                <input type="text" value={data.general.ville} onChange={(e) => handleChange("general", "ville", e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition" />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Instagram Handle</label>
                <input type="text" value={data.general.instagramHandle} onChange={(e) => handleChange("general", "instagramHandle", e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-zinc-400 mb-1">Description</label>
                <textarea rows={3} value={data.general.description} onChange={(e) => handleChange("general", "description", e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition resize-none" />
              </div>
            </div>
          </section>


          <hr className="border-zinc-800" />

          {/* Coordonnées */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-amber-400">Coordonnées</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Téléphone</label>
                <input type="text" value={data.coordonnees.telephone || ""} onChange={(e) => handleChange("coordonnees", "telephone", e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition" />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1 flex items-center gap-2">WhatsApp</label>
                <input type="text" value={data.coordonnees.whatsapp || ""} onChange={(e) => handleChange("coordonnees", "whatsapp", e.target.value)} className="w-full bg-zinc-950 border border-[#25D366]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#25D366] transition" placeholder="+212 6XX-XXXXXX" />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">E-mail</label>
                <input type="email" value={data.coordonnees.email || ""} onChange={(e) => handleChange("coordonnees", "email", e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition" />
              </div>
            </div>
          </section>


          <hr className="border-zinc-800" />

          {/* Liens */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-amber-400">Liens Officiels</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Site Web URL</label>
                <input type="url" value={data.liens.siteWeb} onChange={(e) => handleChange("liens", "siteWeb", e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition" />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Instagram URL</label>
                <input type="url" value={data.liens.instagram} onChange={(e) => handleChange("liens", "instagram", e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition" />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Google Maps / Avis URL</label>
                <input type="url" value={data.liens.googleMaps} onChange={(e) => handleChange("liens", "googleMaps", e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition" />
              </div>
            </div>
          </section>

          <hr className="border-zinc-800" />

          {/* Custom Links */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-amber-400">Liens Personnalisés</h2>
              <button
                type="button"
                onClick={() => {
                  const newLink = { label: "", url: "" };
                  setData((prev: any) => ({ ...prev, customLinks: [...(prev.customLinks || []), newLink] }));
                }}
                className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm px-4 py-2 rounded-lg transition border border-zinc-700"
              >
                <Plus className="w-4 h-4" /> Ajouter un lien
              </button>
            </div>

            {(!data.customLinks || data.customLinks.length === 0) ? (
              <p className="text-sm text-zinc-600 text-center py-6 border border-dashed border-zinc-800 rounded-xl">
                Aucun lien personnalisé. Cliquez sur "Ajouter un lien" pour commencer.
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {data.customLinks.map((link: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 rounded-xl p-3">
                    <Link className="w-4 h-4 text-zinc-600 flex-shrink-0" />
                    <div className="flex flex-col md:flex-row gap-2 flex-1">
                      <input
                        type="text"
                        placeholder="Nom du lien (ex: Catalogue)"
                        value={link.label}
                        onChange={(e) => {
                          const updated = [...data.customLinks];
                          updated[idx] = { ...updated[idx], label: e.target.value };
                          setData((prev: any) => ({ ...prev, customLinks: updated }));
                        }}
                        className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500 transition placeholder:text-zinc-600"
                      />
                      <input
                        type="url"
                        placeholder="https://..."
                        value={link.url}
                        onChange={(e) => {
                          const updated = [...data.customLinks];
                          updated[idx] = { ...updated[idx], url: e.target.value };
                          setData((prev: any) => ({ ...prev, customLinks: updated }));
                        }}
                        className="flex-[2] bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500 transition placeholder:text-zinc-600"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = data.customLinks.filter((_: any, i: number) => i !== idx);
                        setData((prev: any) => ({ ...prev, customLinks: updated }));
                      }}
                      className="text-zinc-600 hover:text-red-500 transition p-1 flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
            {message && (
              <div className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 ${message.includes("succès") ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
                {message.includes("succès") && <CheckCircle className="w-4 h-4" />}
                {message}
              </div>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="ml-auto flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-black px-8 py-3 rounded-xl font-semibold transition disabled:opacity-50 w-full md:w-auto"
            >
              {saving && <Loader2 className="w-5 h-5 animate-spin" />}
              Enregistrer les modifications
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
