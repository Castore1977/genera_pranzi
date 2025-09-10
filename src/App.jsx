import React, { useState, useEffect } from 'react';

// --- Helper Components ---


// Modal Component for displaying recipes and shopping lists
const Modal = ({ title, children, onClose, onCopy, copyButtonText, copyDisabled = false }) => (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
    <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
      <header className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{title}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl">&times;</button>
      </header>
      <div className="p-6 overflow-y-auto flex-grow">
        {children}
      </div>
      <footer className="p-4 border-t border-gray-700 flex justify-end">
        <button onClick={onCopy} disabled={copyDisabled} className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition duration-300 w-32">
          {copyButtonText}
        </button>
      </footer>
    </div>
  </div>
);

// New Modal for regenerating a meal with specific ingredients
const RegenerationModal = ({ isOpen, onClose, onConfirm, specificIngredients, setSpecificIngredients }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col">
        <header className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-emerald-400">Rigenera Pasto</h2>
        </header>
        <div className="p-6">
          <label htmlFor="regen-ingredients" className="font-semibold text-lg text-gray-200 mb-2 block">
            Vuoi usare ingredienti specifici? (Opzionale)
          </label>
          <textarea
            id="regen-ingredients"
            value={specificIngredients}
            onChange={(e) => setSpecificIngredients(e.target.value)}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 h-24 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            placeholder="Es: salmone, zucchine..."
          />
        </div>
        <footer className="p-4 border-t border-gray-700 flex justify-end gap-4">
          <button onClick={onClose} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
            Annulla
          </button>
          <button onClick={onConfirm} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
            Conferma e Rigenera
          </button>
        </footer>
      </div>
    </div>
  );
};


// Loading Spinner Component
const Spinner = ({ size = 'h-12 w-12' }) => (
  <div className={`animate-spin rounded-full ${size} border-b-4 border-emerald-400`}></div>
);

// --- Individual Member Form Component ---
const MemberForm = ({ member, index, handleMemberChange, handleBmrChange, handleActivityChange }) => {
    return (
        <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
            <h3 className="text-xl font-bold mb-4 text-emerald-400">{member.userInfo.name || `Membro ${index + 1}`}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" name="name" value={member.userInfo.name} onChange={(e) => handleMemberChange(index, e)} placeholder="Nome" className="bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
                <select name="gender" value={member.userInfo.gender} onChange={(e) => handleMemberChange(index, e)} className="bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                    <option value="male">Uomo</option>
                    <option value="female">Donna</option>
                </select>
                <div className="flex items-center gap-2"><input type="number" name="age" value={member.userInfo.age} onChange={(e) => handleMemberChange(index, e)} className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none" /><span className="text-gray-400">anni</span></div>
                <div className="flex items-center gap-2"><input type="number" name="weight" value={member.userInfo.weight} onChange={(e) => handleMemberChange(index, e)} className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none" /><span className="text-gray-400">kg</span></div>
                <div className="flex items-center gap-2"><input type="number" name="height" value={member.userInfo.height} onChange={(e) => handleMemberChange(index, e)} className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none" /><span className="text-gray-400">cm</span></div>
                <select value={member.activityLevel} onChange={(e) => handleActivityChange(index, e.target.value)} className="sm:col-span-2 bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                    <option value={1.2}>Sedentario</option>
                    <option value={1.375}>Leggermente attivo</option>
                    <option value={1.55}>Moderatamente attivo</option>
                    <option value={1.725}>Molto attivo</option>
                    <option value={1.9}>Estremamente attivo</option>
                </select>
                <div className="bg-gray-900 p-3 rounded-lg text-center">
                    <label className="text-xs text-gray-400">BMR (Modificabile)</label>
                    <input type="number" value={member.bmr} onChange={(e) => handleBmrChange(index, e.target.value)} className="w-full bg-transparent text-center text-lg font-bold text-cyan-400 focus:outline-none" />
                </div>
                <div className="bg-gray-900 p-3 rounded-lg text-center">
                    <label className="text-xs text-gray-400">Fabbisogno (TDEE)</label>
                    <p className="text-lg font-bold text-emerald-400">{member.tdee} kcal</p>
                </div>
            </div>
        </div>
    );
};

// --- Main App Component ---
export default function App() {
  const defaultMember = {
    userInfo: { name: '', age: 30, weight: 70, height: 175, gender: 'male' },
    activityLevel: 1.375,
    bmr: 0,
    tdee: 0,
  };
  
  // --- State Variables ---
  const [numMembers, setNumMembers] = useState(1);
  const [familyMembers, setFamilyMembers] = useState([defaultMember]);
  
  const [avoidIngredients, setAvoidIngredients] = useState('');
  const [preferredIngredients, setPreferredIngredients] = useState('');
  const [extraShoppingItems, setExtraShoppingItems] = useState('');
  const [mealPlan, setMealPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [isRegenerating, setIsRegenerating] = useState(null); 
  const [isFetchingRecipe, setIsFetchingRecipe] = useState(false);
  const [isGeneratingList, setIsGeneratingList] = useState(false);

  const [selectedMeal, setSelectedMeal] = useState(null); 
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [shoppingList, setShoppingList] = useState(null);
  const [isShoppingListModalOpen, setIsShoppingListModalOpen] = useState(false);
  const [copyButtonText, setCopyButtonText] = useState("Copia Testo");
  
  const [regenModalInfo, setRegenModalInfo] = useState({ isOpen: false, dayIndex: null, mealType: null });
  const [specificRegenIngredients, setSpecificRegenIngredients] = useState('');
  const [imageLibraryLoaded, setImageLibraryLoaded] = useState(false);
  const [pdfLibraryLoaded, setPdfLibraryLoaded] = useState(false);

  // --- Calculations & State Management ---
  useEffect(() => {
    // Dynamically load html2canvas and jspdf libraries
    const loadScript = (src, onLoad) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = onLoad;
        script.onerror = () => console.error(`Failed to load script: ${src}`);
        document.head.appendChild(script);
    };

    loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js', () => {
      setImageLibraryLoaded(true);
    });
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js', () => {
      setPdfLibraryLoaded(true);
    });
  }, []);

  useEffect(() => {
    const newFamily = Array.from({ length: numMembers }, (_, i) => familyMembers[i] || {
        ...defaultMember,
        userInfo: { ...defaultMember.userInfo, name: `` }
    });
    if(newFamily.length !== familyMembers.length) {
        setFamilyMembers(newFamily);
    }
  }, [numMembers, familyMembers]);

  useEffect(() => {
    const updatedFamily = familyMembers.map(member => {
        const { age, weight, height, gender } = member.userInfo;
        let bmrToUse = member.bmr;
        
        let calculatedBmr = 0;
        if (age > 0 && weight > 0 && height > 0) {
            calculatedBmr = (gender === 'male')
                ? Math.round(10 * weight + 6.25 * height - 5 * age + 5)
                : Math.round(10 * weight + 6.25 * height - 5 * age - 161);
        }

        if (member.bmr === 0) {
            bmrToUse = calculatedBmr;
        }

        const newTdee = Math.round(bmrToUse * member.activityLevel);

        return { ...member, bmr: bmrToUse, tdee: newTdee };
    });

    if (JSON.stringify(updatedFamily) !== JSON.stringify(familyMembers)) {
        setFamilyMembers(updatedFamily);
    }
  }, [JSON.stringify(familyMembers.map(m => ({...m.userInfo, activityLevel: m.activityLevel, bmr: m.bmr})))]);
  
  // --- Handlers ---
  const handleMemberChange = (index, e) => {
    const { name, value } = e.target;
    const newFamily = [...familyMembers];
    const updatedUserInfo = { ...newFamily[index].userInfo, [name]: value };
    
    let newBmr = 0;
    if (updatedUserInfo.age > 0 && updatedUserInfo.weight > 0 && updatedUserInfo.height > 0) {
        newBmr = (updatedUserInfo.gender === 'male')
            ? Math.round(10 * updatedUserInfo.weight + 6.25 * updatedUserInfo.height - 5 * updatedUserInfo.age + 5)
            : Math.round(10 * updatedUserInfo.weight + 6.25 * updatedUserInfo.height - 5 * updatedUserInfo.age - 161);
    }
    newFamily[index] = { ...newFamily[index], userInfo: updatedUserInfo, bmr: newBmr };
    setFamilyMembers(newFamily);
  };

  const handleBmrChange = (index, value) => {
    const newFamily = [...familyMembers];
    newFamily[index] = { ...newFamily[index], bmr: Number(value) };
    setFamilyMembers(newFamily);
  };

  const handleActivityChange = (index, value) => {
    const newFamily = [...familyMembers];
    newFamily[index] = { ...newFamily[index], activityLevel: Number(value) };
    setFamilyMembers(newFamily);
  };

  const openRegenModal = (dayIndex) => { // Updated to only need dayIndex
    setRegenModalInfo({ isOpen: true, dayIndex, mealType: 'pasto_ufficio' });
    setSpecificRegenIngredients('');
  };

  const closeRegenModal = () => {
    setRegenModalInfo({ isOpen: false, dayIndex: null, mealType: null });
  };

  // --- Import / Export Functions ---
  const handleExport = () => {
    const dataToExport = { numMembers, familyMembers, avoidIngredients, preferredIngredients, extraShoppingItems };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(dataToExport, null, 2))}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `dati-famiglia.json`;
    link.click();
  };
  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (data.familyMembers && data.numMembers && data.avoidIngredients !== undefined && data.preferredIngredients !== undefined) {
                setNumMembers(data.numMembers);
                setFamilyMembers(data.familyMembers);
                setAvoidIngredients(data.avoidIngredients);
                setPreferredIngredients(data.preferredIngredients);
                setExtraShoppingItems(data.extraShoppingItems || '');
                setError(null);
            } else { setError("File JSON non valido."); }
        } catch (error) { setError("Impossibile leggere il file."); }
    };
    reader.readAsText(file);
    event.target.value = null;
  };
  
  // --- API Call & Meal Plan Logic ---
const callGeminiAPI = async (prompt, schema) => {
    // La chiamata ora va al tuo endpoint API su Vercel
    const apiUrl = '/api/generate';

    const payload = {
        prompt: prompt,
        schema: schema,
    };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorBody = await response.json();
        console.error("API Error Body:", errorBody);
        throw new Error(`API Error: ${response.status} - ${errorBody.error}`);
    }

    return await response.json();
};

  const portionSchema = { type: "OBJECT", properties: { nome_membro: { type: "STRING" }, quantita_suggerita: { type: "STRING" }, calorie_porzione: { type: "NUMBER" }, proteine: { type: "NUMBER" }, carboidrati: { type: "NUMBER" }, grassi: { type: "NUMBER" }}, required: ["nome_membro", "quantita_suggerita", "calorie_porzione", "proteine", "carboidrati", "grassi"]};
  const detailedMealSchema = { type: "OBJECT", properties: { nome: { type: "STRING" }, porzioni: { type: "ARRAY", items: portionSchema }}, required: ["nome", "porzioni"]};
  
  // Nuova logica di generazione per un unico pasto al giorno (pranzo in ufficio)
  const generateMealPlan = async () => {
    const validMembers = familyMembers.filter(m => m.tdee > 0);
    if (validMembers.length === 0) {
        setError("Calcola il fabbisogno per almeno un membro.");
        return;
    }
    setIsLoading(true);
    setError(null);
    setMealPlan(null);

    // Calcoliamo il fabbisogno calorico per il solo pasto (pranzo), circa il 35% del TDEE
    const lunchRatio = 0.35;
    const membersData = validMembers.map((m, i) => ({
        nome: m.userInfo.name || `Membro ${i + 1}`,
        fabbisogno_pasto: Math.round(m.tdee * lunchRatio)
    }));

    let prompt = `Crea un piano alimentare di 7 giorni con un solo pasto al giorno. Questi pasti devono essere "pranzi da ufficio", ovvero piatti che possono essere mangiati freddi o scaldati al microonde, senza necessità di preparazioni complesse al momento del consumo (es. solo mescolare o aggiungere un filo d'olio). I membri e il loro fabbisogno calorico stimato per questo pasto sono: ${JSON.stringify(membersData)}. Per ogni pasto, fornisci: nome del piatto e un array 'porzioni' con nome_membro, quantita_suggerita, calorie_porzione, e macronutrienti. La risposta DEVE essere un oggetto JSON valido.`;
    if (avoidIngredients.trim()) prompt += ` NON usare MAI: ${avoidIngredients}.`;
    if (preferredIngredients.trim()) prompt += ` Includi o preferisci: ${preferredIngredients}.`;

    // Schema aggiornato per un unico pasto per giorno
    const schema = { type: "OBJECT", properties: { piano_settimanale: { type: "ARRAY", items: { type: "OBJECT", properties: { giorno: { type: "STRING" }, pasto_ufficio: detailedMealSchema }, required: ["giorno", "pasto_ufficio"]}}}, required: ["piano_settimanale"]};

    try {
      const result = await callGeminiAPI(prompt, schema);
      setMealPlan(result.piano_settimanale);
    } catch (err) {
      setError(`Errore durante la generazione del piano: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleConfirmRegeneration = async () => {
    const { dayIndex } = regenModalInfo;
    const validMembers = familyMembers.filter(m => m.tdee > 0);

    if (validMembers.length === 0) {
        setError("Nessun membro valido per la rigenerazione.");
        closeRegenModal();
        return;
    }
    
    setIsRegenerating({ dayIndex, mealType: 'pasto_ufficio' });
    closeRegenModal();
    setError(null);

    const lunchRatio = 0.35;
    const membersDataForMeal = validMembers.map((m, i) => ({ 
        nome: m.userInfo.name || `Membro ${i + 1}`, 
        fabbisogno_pasto: Math.round(m.tdee * lunchRatio)
    }));

    let prompt = `Genera una nuova proposta per un pasto da ufficio. I membri e il loro fabbisogno calorico per questo specifico pasto sono: ${JSON.stringify(membersDataForMeal)}. Il pasto deve essere lo stesso per tutti, ma con quantità personalizzate per ciascun membro. Fornisci: nome del piatto e un array 'porzioni' come nella richiesta principale.`;
    if (avoidIngredients.trim()) prompt += ` NON usare MAI: ${avoidIngredients}.`;
    if (preferredIngredients.trim()) prompt += ` Includi o preferisci: ${preferredIngredients}.`;
    if (specificRegenIngredients.trim()) {
      prompt += ` DEVI usare i seguenti ingredienti: ${specificRegenIngredients}.`;
    }
    prompt += ` Il pasto deve essere un piatto che si può mangiare freddo o scaldare al microonde. La risposta DEVE essere un oggetto JSON valido.`;

    const schema = { type: "OBJECT", properties: { nuovo_pasto: detailedMealSchema }, required: ["nuovo_pasto"] };

    try {
        const result = await callGeminiAPI(prompt, schema);
        const newMeal = result.nuovo_pasto;

        const newMealPlan = JSON.parse(JSON.stringify(mealPlan));
        newMealPlan[dayIndex]['pasto_ufficio'] = newMeal;

        setMealPlan(newMealPlan);
    } catch (err) {
        setError(`Errore durante la rigenerazione del pasto: ${err.message}`);
    } finally {
        setIsRegenerating(null);
    }
  };


  const generateShoppingList = async () => {
    if (!mealPlan) return;
    setIsGeneratingList(true);
    setIsShoppingListModalOpen(true);
    setShoppingList(null);

    let prompt = `Dato il seguente piano alimentare (piano di pranzi per l'ufficio), crea una lista della spesa consolidata per una famiglia di ${familyMembers.length} persone. Raggruppa gli ingredienti per categoria (es. Frutta e Verdura, etc.). Fornisci quantità stimate per l'intera settimana per tutta la famiglia. Il piano è: ${JSON.stringify(mealPlan)}. Inoltre, aggiungi questa lista di articoli extra in una categoria separata chiamata 'Altro': ${extraShoppingItems}. La risposta DEVE essere un oggetto JSON valido.`;
    const schema = { type: "OBJECT", properties: { lista_spesa: { type: "ARRAY", items: { type: "OBJECT", properties: { categoria: { type: "STRING" }, items: { type: "ARRAY", items: { type: "STRING" }}}, required: ["categoria", "items"]}}}, required: ["lista_spesa"]};

    try {
      const result = await callGeminiAPI(prompt, schema);
      setShoppingList(result.lista_spesa);
    } catch(err) {
      setShoppingList([{ categoria: "Errore", items: [`Impossibile generare la lista: ${err.message}`] }]);
    } finally {
      setIsGeneratingList(false);
    }
  };
  
const exportPlanToPdf = () => {
    if (!mealPlan || !imageLibraryLoaded || !pdfLibraryLoaded) {
      setError("Il piano non è ancora stato generato o le librerie di esportazione non sono pronte.");
      return;
    }
    const planElement = document.getElementById('meal-plan-table');
    if (planElement) {
        const exportContainer = document.createElement('div');
        exportContainer.style.position = 'absolute';
        exportContainer.style.top = '-9999px';
        exportContainer.style.left = '0px';
        exportContainer.style.width = '1200px';
        exportContainer.style.padding = '25px';
        exportContainer.style.backgroundColor = '#111827';
        exportContainer.style.fontFamily = 'sans-serif';
        
        const titleElement = document.createElement('h2');
        titleElement.innerText = 'Piano Alimentare Settimanale per l\'Ufficio';
        titleElement.style.textAlign = 'center';
        titleElement.style.fontSize = '32px';
        titleElement.style.marginBottom = '25px';
        titleElement.style.color = '#34d399';
        exportContainer.appendChild(titleElement);
        
        const tableClone = planElement.cloneNode(true);
        exportContainer.appendChild(tableClone);
        document.body.appendChild(exportContainer);

        window.html2canvas(exportContainer, { 
            useCORS: true,
            scale: 2 
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/jpeg', 0.95);
            const pdf = new window.jspdf.jsPDF({
                orientation: 'portrait',
                unit: 'pt',
                format: 'a4'
            });
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('piano-pranzi-ufficio.pdf');

        }).catch(err => {
            setError(`Errore durante l'esportazione in PDF: ${err.message}`);
        }).finally(() => {
            document.body.removeChild(exportContainer);
        });
    }
};

  const fetchRecipe = async (meal) => {
    setSelectedMeal(meal);
    setIsFetchingRecipe(true);
    setRecipeDetails(null);
    let prompt = `Fornisci una ricetta dettagliata per preparare "${meal.nome}" per ${familyMembers.length} persone. Elenca gli ingredienti con quantità totali e le istruzioni passo-passo. Il piatto deve essere un pranzo da ufficio (facilmente trasportabile e consumabile). La risposta DEVE essere un oggetto JSON valido.`;
    const schema = { type: "OBJECT", properties: { ricetta: { type: "OBJECT", properties: { ingredienti: { type: "ARRAY", items: { type: "STRING" }}, istruzioni: { type: "STRING" }}, required: ["ingredienti", "istruzioni"]}}, required: ["ricetta"]};
    try {
        const result = await callGeminiAPI(prompt, schema);
        setRecipeDetails(result.ricetta);
    } catch (err) {
        setRecipeDetails({ ingredienti: [], istruzioni: `Impossibile caricare la ricetta: ${err.message}` });
    } finally {
        setIsFetchingRecipe(false);
    }
  };

  const copyTextToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setCopyButtonText("Copiato!");
    } catch (err) {
      setCopyButtonText("Errore");
    }
    document.body.removeChild(textArea);
    setTimeout(() => setCopyButtonText("Copia Testo"), 2000);
  };
  
  const copyRecipeToClipboard = () => {
    if (!recipeDetails || !selectedMeal) return;
    const recipeText = `Ricetta: ${selectedMeal.nome} (per ${familyMembers.length} persone)\n\nINGREDIENTI:\n- ${recipeDetails.ingredienti.join("\n- ")}\n\nISTRUZIONI:\n${recipeDetails.istruzioni}`;
    copyTextToClipboard(recipeText);
  };

  const copyShoppingListToClipboard = () => {
    if (!shoppingList) return;
    const listText = shoppingList.map(cat => `${cat.categoria.toUpperCase()}\n${cat.items.map(item => `- ${item}`).join("\n")}`).join("\n\n");
    copyTextToClipboard(`LISTA DELLA SPESA (per ${familyMembers.length} persone)\n\n${listText}`);
  };

  const handleCloseModal = () => {
      setSelectedMeal(null);
      setIsShoppingListModalOpen(false);
  };
  
  // --- JSX for Rendering ---
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Generatore di Pranzo per l'Ufficio</h1>
          <p className="text-lg text-gray-300 mt-2">Il tuo assistente nutrizionale per i pasti in ufficio.</p>
        </header>

        {/* Family Setup Section */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-2xl mb-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-emerald-400">Configura la tua Famiglia</h2>
            <div className="flex flex-col items-center gap-4 mb-8">
                <label htmlFor="num-members" className="font-semibold text-lg">Di quante persone è composto il nucleo familiare?</label>
                <input id="num-members" type="number" min="1" max="10" value={numMembers} onChange={(e) => setNumMembers(Number(e.target.value))} className="bg-gray-700 text-white border border-gray-600 rounded-lg p-3 w-32 text-center text-xl font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {familyMembers.map((member, index) => (
                    <MemberForm key={index} member={member} index={index} handleMemberChange={handleMemberChange} handleBmrChange={handleBmrChange} handleActivityChange={handleActivityChange} />
                ))}
            </div>

            <div className="mt-6 border-t border-gray-700 pt-6 flex flex-col md:flex-row gap-4 justify-center">
                <button onClick={handleExport} className="flex-grow bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300">Esporta Dati Famiglia</button>
                <label htmlFor="import-input" className="flex-grow text-center cursor-pointer bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300">Importa Dati Famiglia</label>
                <input type="file" id="import-input" accept=".json" className="hidden" onChange={handleImport}/>
            </div>
        </div>

        {/* Preferences and Generation Section */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-2xl mb-8 flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-center text-emerald-400">Preferenze e Articoli Extra</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="avoid-ingredients" className="font-semibold text-lg text-gray-200 mb-2 block">Ingredienti da Evitare (per tutti):</label>
              <textarea id="avoid-ingredients" value={avoidIngredients} onChange={(e) => setAvoidIngredients(e.target.value)} className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 h-24 focus:ring-2 focus:ring-red-500 focus:outline-none" placeholder="Es: cipolla, aglio..."/>
            </div>
            <div>
              <label htmlFor="preferred-ingredients" className="font-semibold text-lg text-gray-200 mb-2 block">Ingredienti Graditi (per tutti):</label>
              <textarea id="preferred-ingredients" value={preferredIngredients} onChange={(e) => setPreferredIngredients(e.target.value)} className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 h-24 focus:ring-2 focus:ring-green-500 focus:outline-none" placeholder="Es: pollo, riso..."/>
            </div>
          </div>
            <div>
              <label htmlFor="extra-items" className="font-semibold text-lg text-gray-200 mb-2 block">Articoli Extra per la Spesa:</label>
              <textarea id="extra-items" value={extraShoppingItems} onChange={(e) => setExtraShoppingItems(e.target.value)} className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 h-24 focus:ring-2 focus:ring-cyan-500 focus:outline-none" placeholder="Es: detersivo piatti, carta igienica, pile..."/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <button onClick={generateMealPlan} disabled={isLoading || isRegenerating !== null} className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 duration-300 shadow-lg">{isLoading ? 'Generazione...' : 'Genera Piano'}</button>
              <button onClick={generateShoppingList} disabled={!mealPlan || isGeneratingList || isRegenerating !== null} className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 duration-300 shadow-lg">{isGeneratingList ? 'Creando...' : 'Lista Spesa'}</button>
              <button onClick={exportPlanToPdf} disabled={!mealPlan || !imageLibraryLoaded || !pdfLibraryLoaded || isRegenerating !== null} className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 duration-300 shadow-lg">Esporta Piano PDF</button>
            </div>
        </div>

        <main>
          {isLoading && <div className="flex justify-center p-10"><Spinner /></div>}
          {error && <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative mb-4" role="alert"><strong className="font-bold">Errore: </strong><span className="block sm:inline">{error}</span><button onClick={() => setError(null)} className="absolute top-0 bottom-0 right-0 px-4 py-3 text-2xl">&times;</button></div>}
          
          {mealPlan && (
            <div id="meal-plan-table" className="overflow-x-auto bg-gray-800 rounded-xl shadow-2xl p-2">
              <table className="min-w-full text-left table-fixed">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="p-4 text-sm font-semibold uppercase tracking-wider text-gray-300">Giorno</th>
                    <th className="p-4 text-sm font-semibold uppercase tracking-wider text-gray-300">Pasto per l'Ufficio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {mealPlan.map((day, dayIndex) => (
                    <tr key={dayIndex} className="hover:bg-gray-700/50 transition-colors duration-200">
                      <td className="p-4 font-bold text-emerald-400 align-top">{day.giorno}</td>
                      <td className="p-4 align-top space-y-3">
                       <div className="flex justify-between items-start">
                         <div onClick={() => fetchRecipe(day.pasto_ufficio)} className="font-bold cursor-pointer hover:underline hover:text-cyan-300 mb-2 flex-grow pr-2">{day.pasto_ufficio.nome}</div>
                         <button onClick={() => openRegenModal(dayIndex)} disabled={isRegenerating !== null} className="text-gray-400 hover:text-emerald-400 transition-transform duration-200 hover:rotate-90 disabled:cursor-not-allowed disabled:opacity-50 flex-shrink-0">
                           {isRegenerating?.dayIndex === dayIndex ? <Spinner size="h-5 w-5"/> : '🔄'}
                         </button>
                       </div>
                       {day.pasto_ufficio.porzioni.map((portion, i) => (
                         <div key={i} className="p-2 bg-gray-900/50 rounded-md">
                           <p className="font-semibold text-cyan-400 text-sm">{portion.nome_membro}</p>
                           <p className="text-gray-300">{portion.quantita_suggerita}</p>
                           <p className="text-xs text-gray-500">{portion.calorie_porzione} kcal (P:{portion.proteine} C:{portion.carboidrati} G:{portion.grassi})</p>
                         </div>
                       ))}
                    </td>
                    </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
      
      {/* Modals */}
      <RegenerationModal 
        isOpen={regenModalInfo.isOpen}
        onClose={closeRegenModal}
        onConfirm={handleConfirmRegeneration}
        specificIngredients={specificRegenIngredients}
        setSpecificIngredients={setSpecificRegenIngredients}
      />

      {selectedMeal && <Modal title={`Ricetta: ${selectedMeal.nome}`} onClose={handleCloseModal} onCopy={copyRecipeToClipboard} copyButtonText={copyButtonText} copyDisabled={isFetchingRecipe || !recipeDetails}>
        {isFetchingRecipe && <div className="flex justify-center p-10"><Spinner /></div>}
        {recipeDetails && <div className="text-gray-300"><h3 className="text-xl font-semibold text-emerald-400 mb-3">Ingredienti (per {familyMembers.length} persone):</h3><ul className="list-disc list-inside mb-6 pl-2 space-y-1">{recipeDetails.ingredienti.map((ing, i) => <li key={i}>{ing}</li>)}</ul><h3 className="text-xl font-semibold text-emerald-400 mb-3">Istruzioni:</h3><p className="whitespace-pre-wrap leading-relaxed">{recipeDetails.istruzioni}</p></div>}
      </Modal>}

      {isShoppingListModalOpen && <Modal title="Lista della Spesa Familiare" onClose={handleCloseModal} onCopy={copyShoppingListToClipboard} copyButtonText={copyButtonText} copyDisabled={isGeneratingList || !shoppingList}>
          {isGeneratingList && <div className="flex justify-center p-10"><Spinner /></div>}
          {shoppingList && <div className="text-gray-300 space-y-6">{shoppingList.map((category, i) => (<div key={i}><h3 className="text-xl font-semibold text-cyan-400 mb-3 border-b-2 border-cyan-800 pb-1">{category.categoria}</h3><ul className="list-disc list-inside pl-2 space-y-1">{category.items.map((item, j) => <li key={j}>{item}</li>)}</ul></div>))}</div>}
      </Modal>}
    </div>
  );
}
