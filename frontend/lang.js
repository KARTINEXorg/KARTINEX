document.addEventListener('DOMContentLoaded', () => {

    // --- अनुवाद (Translation) का लॉजिक ---
    const translations = {
        en: { "search-placeholder": "Search for products, brands and more", "login-btn": "Login", "lang-label": "Language:", "all-categories-title": "All Categories", "cat-mobiles": "Mobiles", "cat-fashion": "Fashion", "cat-electronics": "Electronics", "cat-home": "Home", "cat-travel": "Travel", "cat-beauty": "Beauty", "our-products-title": "Trending Products", "footer-text": "© 2025 Kartinex. All rights reserved.", "offline-text": "You are offline!" },
        hi: { "search-placeholder": "उत्पादों, ब्रांडों और अधिक के लिए खोजें", "login-btn": "लॉगिन", "lang-label": "भाषा:", "all-categories-title": "सभी श्रेणियाँ", "cat-mobiles": "मोबाइल्स", "cat-fashion": "फैशन", "cat-electronics": "इलेक्ट्रॉनिक्स", "cat-home": "घर का सामान", "cat-travel": "यात्रा", "cat-beauty": "सौंदर्य", "our-products-title": "ट्रेंडिंग प्रोडक्ट्स", "footer-text": "© 2025 कार्टिनेक्स। सभी अधिकार सुरक्षित।", "offline-text": "आप ऑफ़लाइन हैं!" }
    };
    const languageSwitcher = document.getElementById('language-switcher');
    function setLanguage(lang) {
        document.documentElement.lang = lang;
        for (const id in translations[lang]) {
            const element = document.getElementById(id);
            if (element) {
                if (element.placeholder !== undefined) { element.placeholder = translations[lang][id]; }
                else { element.textContent = translations[lang][id]; }
            }
        }
        localStorage.setItem('language', lang);
    }
    languageSwitcher.addEventListener('change', (event) => setLanguage(event.target.value));

    // --- साइडबार का लॉजिक ---
    const menuIcon = document.getElementById('menu-icon');
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.getElementById('close-btn');
    const overlay = document.getElementById('overlay');
    const openSidebar = () => { sidebar.classList.add('open'); overlay.classList.add('show'); };
    const closeSidebar = () => { sidebar.classList.remove('open'); overlay.classList.remove('show'); };
    menuIcon.addEventListener('click', openSidebar);
    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    // --- ऑफलाइन फीचर का लॉजिक ---
    const offlinePopup = document.getElementById('offline-popup');
    const handleOnline = () => { document.body.classList.remove('offline-mode'); offlinePopup.classList.remove('show'); };
    const handleOffline = () => { document.body.classList.add('offline-mode'); offlinePopup.classList.add('show'); };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // --- पेज लोड होने पर चलने वाला कोड ---
    if (!navigator.onLine) { handleOffline(); }
    const savedLang = localStorage.getItem('language') || 'en';
    languageSwitcher.value = savedLang;
    setLanguage(savedLang);

    // ======== Backend टेस्टिंग सिस्टम ========
    const resultText = document.getElementById('test-result');

    // साइनअप टेस्टिंग
    const signupBtn = document.getElementById('test-signup-btn');
    if (signupBtn) {
        signupBtn.addEventListener('click', async () => {
            resultText.textContent = 'Sending Signup Request...';
            resultText.style.color = 'black';
            const userData = {
                name: "Test Signup User",
                email: "testsignup" + Math.floor(Math.random() * 10000) + "@example.com",
                phone: Math.random().toString().slice(2, 12),
                password: "testpassword"
            };
            try {
                const response = await fetch('https://kartinex-backend.onrender.com/api/auth/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData),
                });
                const data = await response.json();
                if (response.ok) {
                    resultText.textContent = 'Signup Success! User created. Now try logging in with this email: ' + userData.email;
                    resultText.style.color = 'green';
                } else {
                    resultText.textContent = 'Signup Error: ' + (data.msg || data.message || 'Unknown error');
                    resultText.style.color = 'red';
                }
            } catch (error) {
                resultText.textContent = 'Fatal Error! Could not connect.';
                resultText.style.color = 'red';
            }
        });
    }

    // लॉगिन टेस्टिंग
    const loginBtn = document.getElementById('test-login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', async () => {
            resultText.textContent = 'Sending Login Request...';
            resultText.style.color = 'black';
            
            // बहुत ज़रूरी: यहाँ पर वह ईमेल और पासवर्ड डालो जिससे साइनअप सफल हुआ हो।
            // तुम MongoDB Atlas में जाकर कोई भी एक ईमेल कॉपी कर सकते हो।
            const loginData = {
                email: "thewinner@example.com", // <-- इसे अपने सफल साइनअप वाले ईमेल से बदलो
                password: "winnerpassword"     // <-- इसे उस यूज़र के पासवर्ड से बदलो
            };

            try {
                const response = await fetch('https://kartinex-backend.onrender.com/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(loginData),
                });
                const data = await response.json();
                if (response.ok) {
                    resultText.textContent = 'Login Success! Token Received!';
                    console.log('Your Token:', data.token);
                    resultText.style.color = 'blue';
                } else {
                    resultText.textContent = 'Login Error: ' + (data.msg || 'Invalid Credentials');
                    resultText.style.color = 'red';
                }
            } catch (error) {
                resultText.textContent = 'Fatal Error! Could not connect.';
                resultText.style.color = 'red';
            }
        });
    }
});
