'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import emailjs from '@emailjs/browser';
import { 
  Moon, Sun, Menu, X, Github, Linkedin, Mail, Phone, MapPin, 
  Download, ChevronRight, Code, Brain, Database, Award, 
  GraduationCap, Briefcase, User, FolderOpen, Heart, Send,
  ExternalLink, Calendar, Globe, Settings, Server, Shield
} from 'lucide-react';

const Portfolio = () => {
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const toggleTheme = () => setIsDark(!isDark);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Fonction pour télécharger le CV
  const downloadCV = () => {
    try {
      // Solution simple et robuste
      const link = document.createElement('a');
      link.href = '/cv/cv-ilyas.pdf'; // Nom simplifié sans caractères spéciaux
      link.download = 'CV-Ilyas-ElKhyari.pdf';
      link.target = '_blank'; // Ouvrir dans un nouvel onglet si le téléchargement échoue
      
      // Alternative pour les navigateurs qui bloquent le téléchargement
      link.rel = 'noopener noreferrer';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('Tentative de téléchargement du CV');
    } catch (error) {
      console.error('Erreur téléchargement CV:', error);
      // Fallback : ouvrir directement le PDF
      window.open('/cv/cv-ilyas.pdf', '_blank');
    }
  };

  // Gérer les changements du formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Envoyer l'email
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      console.log('Tentative d\'envoi email...');
      
      // Vérifier qu'EmailJS est disponible
      if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS not loaded');
      }
      
      // Configuration EmailJS avec vos IDs - À REMPLACER
      const result = await emailjs.send(
        'service_cuonmzf',     // NOUVEAU Service ID pour Ilyas
        'template_0ugt719',    // NOUVEAU Template ID pour Ilyas
        {
          from_name: formData.nom,
          from_email: formData.email,
          subject: formData.sujet,
          message: formData.message,
          to_email: 'ilyaskhyari1@gmail.com', // Email de destination
        }
      );

      console.log('Résultat EmailJS:', result);

      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({ nom: '', email: '', sujet: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Erreur envoi email:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Initialiser EmailJS - À REMPLACER par la nouvelle clé publique d'Ilyas
    emailjs.init('i5wVN5FMR_V2qYgE3');
    
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'certifications', 'education', 'interests', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Accueil', icon: User },
    { id: 'about', label: 'À propos', icon: User },
    { id: 'experience', label: 'Expérience', icon: Briefcase },
    { id: 'projects', label: 'Projets', icon: FolderOpen },
    { id: 'skills', label: 'Compétences', icon: Code },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'education', label: 'Formation', icon: GraduationCap },
    { id: 'interests', label: 'Centres intérêt', icon: Heart },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const experiences = [
    {
      company: "INETUM - Casablanca",
      role: "Consultant Technique SAP - Stage de fin d'études",
      period: "Mars-Sept 2025",
      description: "Analyse et mise en œuvre d'une application FIORI UI5/RAP de gestion des ponts bascules sur SAP S4/HANA PUBLIC CLOUD MM (MATERIALS MANAGEMENT)",
      technologies: ["SAP FIORI UI5", "RAP", "ABAP", "SAP S/4HANA", "Excel Integration"],
      highlights: [
        "Gestion centralisée des entités métiers avec interface sécurisée",
        "Optimisation de la traçabilité logistique",
        "Filtres de recherche dynamiques pour analyse des données"
      ]
    },
    {
      company: "L'ONEE - Branche Eau Rabat",
      role: "Développeur IA & Systèmes - Stage",
      period: "Juillet-Sept 2024",
      description: "Gestion intelligente des interventions au niveau du Datacenter",
      technologies: ["Python", "IA", "Reconnaissance faciale", "NLP", "Electron", "Analyse textuelle"],
      highlights: [
        "Développement de programmes d'IA avancés",
        "Intégration services d'intelligence artificielle",
        "Création d'assistant virtuel intelligent"
      ]
    },
    {
      company: "DIGIUP - Rabat",
      role: "Développeur Full Stack - Stage",
      period: "Juillet-Août 2023",
      description: "Conception et développement d'une solution de gestion d'optique",
      technologies: ["Gestion sécurisée", "Interface client", "Gestion stock", "CRM"],
      highlights: [
        "Espace sécurisé pour gestion clients/fournisseurs",
        "Plateforme consultation produits optiques",
        "Système de gestion des ventes et stocks"
      ]
    },
    {
      company: "CONTIGO-SIEMPRE Remote",
      role: "Conseiller Pédagogique",
      period: "Juillet 2021-Août 2023",
      description: "Consultation clients et traitement complet des dossiers de visa",
      technologies: ["Consultation client", "Traitement dossiers", "Processus visa"],
      highlights: [
        "Évaluation initiale à résolution finale",
        "Prise en charge complète du processus",
        "Accompagnement personnalisé des clients"
      ]
    }
  ];

  const projects = [
    {
      title: "Application Web d'Auto Partage - Full Stack MERN",
      type: "Projet Académique",
      description: "Plateforme facilitant la consultation et location de véhicules avec géolocalisation",
      technologies: ["MongoDB", "Express.js", "React", "Node.js", "Géolocalisation"],
      highlights: ["Interface administrateur sécurisée", "Intégration map géolocalisation", "Gestion utilisateurs et réclamations"]
    },
    {
      title: "Application Mobile Reconnaissance de Plantes (PFA)",
      type: "Projet Fin d'Année",
      description: "Modèle d'apprentissage profond pour identifier des espèces végétales",
      technologies: ["Python", "TensorFlow", "CNN", "Flutter", "DART", "Vision par ordinateur"],
      highlights: ["Reconnaissance d'espèces végétales", "Techniques de vision par ordinateur", "Application mobile intuitive"]
    },
    {
      title: "Application Web E-commerce Complète",
      type: "Projet de Développement",
      description: "Site E-commerce avec fonctionnalités avancées de recherche et tri",
      technologies: ["React", "Node.js", "MongoDB", "UI/UX Design"],
      highlights: ["Base de données optimisée", "Recherche multi-critères", "Interface utilisateur moderne"]
    },
    {
      title: "Site Web d'Élevage de Poulets",
      type: "Projet Personnel",
      description: "Site vitrine présente la société d’élevage La Plume Blanche, mettant en avant son savoir-faire, ses valeurs et la qualité de ses produits.",
      technologies: ["React", "Next.js", "JavaScript", "Tailwind CSS","EmailJS"],
      highlights: ["Interface intuitive pour gérer les stocks de poulets", "Suivi en temps réel des ventes", "Dashboard administrateur sécurisé"],
      link: "https://elevage-de-poulets-v2.vercel.app/"  //  lien 
    }
  ];

  const skills = {
    "SAP Technologies": ["ABAP", "SAP FIORI UI5", "RAP", "SAP S/4HANA", "Gestion Rôles & Autorisations", "SAP Integration"],
    "Développement": ["Java", "Python", "JavaScript", "React", "Node.js", "Spring Boot", "Flutter/DART"],
    "Intelligence Artificielle": ["Machine Learning", "Deep Learning", "TensorFlow", "CNN", "NLP", "Reconnaissance faciale"],
    "Base de Données": ["MongoDB", "MySQL", "SQL", "Analyse des données", "ETL"],
    "DevOps & Cloud": ["Docker", "Kubernetes", "OpenShift", "Git", "GitHub", "Azure Networks"],
    "Gestion de Projet": ["Planification projet", "Résolution problèmes", "Esprit d'équipe", "Adaptabilité", "Analyse résultats"]
  };

  const certifications = [
    "Python Data Analysis (Certification officielle, 2023)",
    " Software Engineering: Software Design and Project Management (Certification officielle, 2023)",
    " Unix System Basics (Certification, 2023)",
    "Git and GitHub (GitHub Certification, 2024)",
    "Virtual Networks in Azure (Microsoft, 2024)",
    "Docker, Kubernetes & OpenShift (Red Hat, 2024)",
    "React Native (Meta Certification, 2024)",
    "Neural Networks and Deep Learning (DeepLearning.AI, 2025)",
    "Introduction to Big Data with Spark and Hadoop (Apache, 2025)"
  ];

  const education = [
    {
      degree: "Ingénieur d'État en Informatique - MIAGE",
      school: "EMSI - École Marocaine des Sciences de l'Ingénieur",
      period: "2020-2025",
      status: "DIPLÔMÉ 2025",
      specialty: "Méthodes Informatiques Appliquées à la Gestion des Entreprises"
    },
    {
      degree: "Baccalauréat Sciences Physiques",
      school: "Henri Moissan",
      period: "2019-2020",
      specialty: "Sciences Physiques"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-slate-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header Navigation */}
      <header className={`fixed top-0 w-full z-50 backdrop-blur-lg ${isDark ? 'bg-slate-900/80' : 'bg-white/80'} border-b ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-600 via-amber-500 to-blue-800 bg-clip-text text-transparent">
              EL KHYARI ILYAS
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                    activeSection === item.id
                      ? 'bg-blue-700 text-white'
                      : isDark
                      ? 'text-gray-300 hover:text-white hover:bg-slate-800'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-gray-100'}`}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <button
                onClick={toggleMenu}
                className={`lg:hidden p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-gray-100'}`}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`lg:hidden ${isDark ? 'bg-slate-900' : 'bg-white'} border-t ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    activeSection === item.id
                      ? 'bg-blue-700 text-white'
                      : isDark
                      ? 'text-gray-300 hover:text-white hover:bg-slate-800'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Home Section */}
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700/20 via-amber-600/20 to-slate-800/20"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            {/* Photo de profil */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-600/30 shadow-2xl">
                  <Image
                    src="/images/profile-ilyas.jpg"
                    alt="EL KHYARI ILYAS"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-500 rounded-full border-4 border-white/20 animate-pulse"></div>
              </div>
            </div>
            
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-amber-500 to-blue-800 bg-clip-text text-transparent">
                EL KHYARI ILYAS
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl mb-8 text-gray-300">
                Ingénieur <span className="text-blue-400">Full Stack</span> • 
                 <span className="text-amber-400">FIORI UI5/RAP</span> • 
                 <span className="text-blue-600">Gestion des rôles & Autorisations</span> •
                Consultant <span className="text-amber-400">SAP</span>
              </p>
              <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Ingénieur MIAGE spécialisé en SAP S/4HANA Public Cloud et développement FIORI. Compétences étendues en Full Stack (React, Node.js, MongoDB...)
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <Mail size={20} />
                <span>Me Contacter</span>
              </button>
              <button 
                onClick={downloadCV}
                className="px-8 py-3 border-2 border-amber-500 text-amber-500 rounded-lg font-semibold hover:bg-amber-500 hover:text-white transition-all duration-300 flex items-center space-x-2"
              >
                <Download size={20} />
                <span>Télécharger CV</span>
              </button>
            </div>

            <div className="flex justify-center space-x-6">
              <a href="mailto:ilyaskhyari1@gmail.com" className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300">
                <Mail size={24} />
              </a>
              <a href="https://github.com/Ilyasselkh" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/ilyas-elkhyari-73b028253/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className={`py-20 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-700 to-amber-600 bg-clip-text text-transparent">
              À Propos de Moi
            </h2>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg leading-relaxed">
                  Ingénieur d&apos;État en informatique, option MIAGE (Méthodes Informatiques Appliquées à la 
                  Gestion des Entreprises), passionné par l&apos;intégration des systèmes d&apos;information et les 
                  solutions ERP. Spécialisé en développement SAP, notamment en Gestion des rôles & Autorisations, 
                  RAP et SAP Fiori/UI5.
                </p>
                <p className="text-lg leading-relaxed">
                  J&apos;ai acquis une solide expérience dans la conception et la mise en œuvre d&apos;applications 
                  personnalisées sur SAP S/4HANA, avec une forte sensibilité UX via Fiori. 
                </p>
                <p className="text-lg leading-relaxed">
                   Par ailleurs, je suis également intéressé par un profil Java Full Stack, ce qui me permet de combiner
                   mes compétences backend et frontend pour le développement d&apos;applications web modernes et
                   complètes. Enthousiaste à l&apos;idée d&apos;innover, d&apos;optimiser les processus métiers et de 
                   collaborer au sein d&apos;équipes agiles.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-6">
                  <div className="flex items-center space-x-2">
                    <MapPin size={20} className="text-blue-700" />
                    <span>Casablanca, Rabat, Maroc</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone size={20} className="text-amber-600" />
                    <span>+212 606-692-800</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe size={20} className="text-blue-600" />
                    <span>Français, Anglais, Arabe</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar size={20} className="text-amber-500" />
                    <span>Disponible immédiatement</span>
                  </div>
                </div>
                
                {/* Bouton CV dans la section À propos */}
                <div className="pt-6">
                  <button 
                    onClick={downloadCV}
                    className="px-6 py-3 bg-gradient-to-r from-blue-700 to-amber-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                  >
                    <Download size={20} />
                    <span>Télécharger mon CV</span>
                  </button>
                </div>
              </div>
              <div className={`p-8 rounded-2xl ${isDark ? 'bg-slate-900' : 'bg-gray-50'} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-700/10 to-amber-600/10"></div>
                
                {/* Photo de profil dans la section À propos */}
                <div className="relative z-10 text-center mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-blue-700/20 shadow-lg mb-4">
                    <Image
                      src="/images/profile-ilyas.jpg"
                      alt="EL KHYARI ILYAS"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-6">Ingénieur Full Stack & Consultant SAP Technique</h3>
                </div>
                
                <div className="relative z-10">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Settings className="text-blue-700" size={24} />
                      <span>Full Stack & FIORI UI5/RAP</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Server className="text-amber-600" size={24} />
                      <span>SAP S/4HANA Integration</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Shield className="text-blue-600" size={24} />
                      <span>Gestion Rôles & Autorisations</span>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-700/20 to-amber-600/20 rounded-lg">
                    <p className="font-semibold">Consultant SAP & Développeur Full Stack</p>
                    <p className="text-sm opacity-80">Spécialisation en SAP S/4HANA, FIORI/UI5, RAP et en développement Full Stack.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-700 to-amber-600 bg-clip-text text-transparent">
              Expérience Professionnelle
            </h2>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-all duration-300`}>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-blue-700 mb-1">{exp.company}</h3>
                      <p className="text-lg font-semibold">{exp.role}</p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm bg-amber-600/20 px-3 py-1 rounded-full">
                      <Calendar size={16} />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                  <p className="mb-4 leading-relaxed">{exp.description}</p>
                  {exp.highlights && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-amber-600">Réalisations clés :</h4>
                      <ul className="space-y-1">
                        {exp.highlights.map((highlight, hIndex) => (
                          <li key={hIndex} className="flex items-center space-x-2 text-sm">
                            <ChevronRight size={16} className="text-blue-600" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className={`px-3 py-1 rounded-full text-sm ${isDark ? 'bg-slate-700' : 'bg-gray-100'}`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className={`py-20 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-700 to-amber-600 bg-clip-text text-transparent">
              Projets Académiques
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div key={index} className={`p-6 rounded-2xl ${isDark ? 'bg-slate-900' : 'bg-gray-50'} hover:shadow-xl transition-all duration-300 group`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-700 transition-colors">{project.title}</h3>
                      <p className="text-sm text-amber-600 font-medium">{project.type}</p>
                    </div>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={20} className="text-gray-400 group-hover:text-blue-700 transition-colors" />
                      </a>
                    )}
                  </div>
                  <p className="mb-4 leading-relaxed">{project.description}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Points clés :</h4>
                    <ul className="space-y-1">
                      {project.highlights.map((highlight, hIndex) => (
                        <li key={hIndex} className="flex items-center space-x-2 text-sm">
                          <ChevronRight size={16} className="text-amber-600" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className={`px-2 py-1 rounded-full text-xs ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20">
          <div className="max-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-700 to-amber-600 bg-clip-text text-transparent">
              Compétences Techniques
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(skills).map(([category, skillList], index) => (
                <div key={index} className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-all duration-300`}>
                  <h3 className="text-lg font-bold mb-4 text-blue-700">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, skillIndex) => (
                      <span key={skillIndex} className={`px-3 py-1 rounded-full text-sm ${isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors cursor-default`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className={`py-20 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-700 to-amber-600 bg-clip-text text-transparent">
              Certifications
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert, index) => (
                <div key={index} className={`p-4 rounded-xl ${isDark ? 'bg-slate-900' : 'bg-gray-50'} hover:shadow-lg transition-all duration-300 flex items-center space-x-3`}>
                  <Award className="text-amber-500 flex-shrink-0" size={20} />
                  <span className="text-sm leading-tight">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-700 to-amber-600 bg-clip-text text-transparent">
              Formation
            </h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-all duration-300`}>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1">{edu.degree}</h3>
                      <p className="text-blue-700 font-medium mb-2">{edu.school}</p>
                      {edu.specialty && (
                        <p className="text-sm text-amber-600 mb-2">{edu.specialty}</p>
                      )}
                      {edu.status && (
                        <span className="inline-block px-3 py-1 bg-amber-600/20 text-amber-600 rounded-full text-sm font-medium">
                          {edu.status}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm bg-blue-700/20 px-3 py-1 rounded-full mt-2 lg:mt-0">
                      <Calendar size={16} />
                      <span>{edu.period}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interests Section */}
        <section id="interests" className={`py-20 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-700 to-amber-600 bg-clip-text text-transparent">
              Centres d&apos;Intérêt
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-900' : 'bg-gray-50'} text-center hover:shadow-lg transition-all duration-300`}>
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-700/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🩸</span>
                </div>
                <h3 className="font-bold mb-2">Rotarie - Bénévolat</h3>
                <p className="text-sm"> Créer un site web au titre du bénévolat, Actions humanitaires, don du sang</p>
              </div>
              <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-900' : 'bg-gray-50'} text-center hover:shadow-lg transition-all duration-300`}>
                <div className="w-16 h-16 mx-auto mb-4 bg-amber-600/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">₿</span>
                </div>
                <h3 className="font-bold mb-2">Technologie Financière</h3>
                <p className="text-sm">Cryptomonnaie, blockchain</p>
              </div>
              <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-900' : 'bg-gray-50'} text-center hover:shadow-lg transition-all duration-300`}>
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-600/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎵</span>
                </div>
                <h3 className="font-bold mb-2">Musique</h3>
                <p className="text-sm">Passion musicale & créativité</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-700 to-amber-600 bg-clip-text text-transparent">
              Me Contacter
            </h2>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold mb-6">Restons en contact</h3>
                <p className="text-lg leading-relaxed mb-8">
                  Consultant SAP & Développeur Full Stack.
                  Spécialisé en FIORI UI5/RAP et en intégration SAP S/4HANA, avec une expertise en technologies Full Stack modernes.
                  Passionné par l&apos;optimisation des processus métiers et l&apos;innovation technologique, je conçois des solutions robustes, performantes et centrées sur l&apos;UX. 
                  N&apos;hésitez pas à me contacter pour vos projets !
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-blue-700/20 rounded-lg">
                      <Mail className="text-blue-700" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <a href="mailto:ilyaskhyari1@gmail.com" className="text-blue-700 hover:underline">
                        ilyaskhyari1@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-amber-600/20 rounded-lg">
                      <Phone className="text-amber-600" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">Téléphone</p>
                      <a href="tel:+212606692800" className="text-amber-600 hover:underline">
                        +212 606-692-800
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-blue-600/20 rounded-lg">
                      <MapPin className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">Localisation</p>
                      <p>Casablanca, Rabat, Maroc</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <p className="font-semibold mb-3">Retrouvez-moi sur :</p>
                  <div className="flex space-x-4">
                    <a href="https://github.com/Ilyasselkh" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-600/20 hover:bg-slate-600/30 rounded-lg transition-colors">
                      <Github size={24} />
                    </a>
                    <a href="https://www.linkedin.com/in/ilyas-elkhyari-73b028253/" target="_blank" rel="noopener noreferrer" className="p-3 bg-blue-700/20 hover:bg-blue-700/30 rounded-lg transition-colors">
                      <Linkedin size={24} />
                    </a>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-lg`}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom complet</label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDark 
                          ? 'bg-slate-700 border-slate-600 text-white focus:border-blue-700' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-700'
                      } focus:ring-2 focus:ring-blue-700/20 outline-none transition-all`}
                      placeholder="Votre nom complet"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDark 
                          ? 'bg-slate-700 border-slate-600 text-white focus:border-blue-700' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-700'
                      } focus:ring-2 focus:ring-blue-700/20 outline-none transition-all`}
                      placeholder="votre.email@exemple.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Sujet</label>
                    <input
                      type="text"
                      name="sujet"
                      value={formData.sujet}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDark 
                          ? 'bg-slate-700 border-slate-600 text-white focus:border-blue-700' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-700'
                      } focus:ring-2 focus:ring-blue-700/20 outline-none transition-all`}
                      placeholder="Projet SAP / Consultation"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDark 
                          ? 'bg-slate-700 border-slate-600 text-white focus:border-blue-700' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-700'
                      } focus:ring-2 focus:ring-blue-700/20 outline-none transition-all resize-none`}
                      placeholder="Décrivez votre projet SAP ou vos besoins..."
                    ></textarea>
                  </div>
                  
                  {/* Messages de statut */}
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-amber-600/20 text-amber-600 rounded-lg text-sm">
                      ✅ Message envoyé avec succès ! Je vous répondrai rapidement.
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-600/20 text-red-600 rounded-lg text-sm">
                      ❌ Erreur lors de l&apos;envoi. Veuillez réessayer ou me contacter directement.
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-6 py-3 bg-gradient-to-r from-blue-700 to-amber-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    <Send size={20} />
                    <span>{isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`py-8 ${isDark ? 'bg-slate-900 border-t border-slate-800' : 'bg-white border-t border-gray-200'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mb-4 text-lg font-semibold">
              EL KHYARI ILYAS
            </p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Ingénieur Full Stack • FIORI UI5/RAP • Gestion des rôles & Autorisations
            </p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
              Consultant SAP
            </p>
            <div className="flex justify-center space-x-6 mt-6">
              <a href="mailto:ilyaskhyari1@gmail.com" className="text-blue-700 hover:text-blue-800 transition-colors">
                <Mail size={20} />
              </a>
              <a href="https://github.com/Ilyasselkh" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-700 transition-colors">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/ilyas-el-khyari" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mt-6`}>
              © 2025  EL KHYARI ILYAS. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
