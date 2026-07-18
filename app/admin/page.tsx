"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../components/stores/useAuthStore";
import AdminGuard from "../components/admin/AdminGuard";
import GemcaLogo from "../components/GemcaLogo";
import { 
  initDbAction, 
  getLeadsAction, 
  addLeadAction, 
  updateLeadAction,
  updateLeadStatusAction, 
  deleteLeadAction 
} from "../actions/leads";
import {
  getVisaListAction,
  createVisaAction,
  deleteVisaAction as deleteAdminVisaAction,
  getCategoryListAction,
  createCategoryAction
} from "../actions/visas";
import {
  getExpertsAction,
  createExpertAction,
  updateExpertAction,
  deleteExpertAction,
  uploadExpertImageAction,
} from "../actions/experts";
import type { ExpertData } from "../actions/experts";
import {
  getBlogsAction,
  createBlogAction,
  updateBlogAction,
  deleteBlogAction,
  uploadBlogImageAction,
} from "../actions/blogs";
import type { BlogData } from "../actions/blogs";
import {
  getSitePageAction,
  updateSitePageAction,
} from "../actions/sitePages";
import { 
  LogOut, 
  Users, 
  BriefcaseBusiness,
  FileText, 
  PhoneCall, 
  AlertTriangle, 
  Search, 
  Plus, 
  TrendingUp, 
  CheckCircle,
  Award,
  Eye,
  Trash2,
  Calendar,
  X,
  FileSpreadsheet,
  Database,
  RefreshCw,
  Menu,
  Layers,
  Settings,
  ShieldAlert,
  Clock,
  Globe,
  Upload,
  MessageSquare,
  Pencil,
  Lock,
  Save
} from "lucide-react";

// Types
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  pathway: string;
  status: "New" | "In Progress" | "Approved" | "Action Required";
  date: string;
  notes: string;
}

type ExpertFormState = Omit<ExpertData, "qualifications" | "specialties" | "languages"> & {
  qualifications: string;
  specialties: string;
  languages: string;
};

type BlogFormState = BlogData;

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, logout, updatePassword } = useAuthStore();
  
  // Dashboard States
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  
  // Sidebar states
  const [activeTab, setActiveTab] = useState<"leads" | "inquiries" | "careers" | "visas" | "experts" | "blogs" | "settings">("leads");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [editingInquiryId, setEditingInquiryId] = useState<string | null>(null);
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    pathway: "General Migration Consultation",
    status: "New" as Lead["status"],
    location: "",
    preferredTime: "",
    message: ""
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [settingsMessage, setSettingsMessage] = useState("");
  const [settingsError, setSettingsError] = useState("");
  const [termsLoading, setTermsLoading] = useState(false);
  const [termsForm, setTermsForm] = useState({
    title: "Terms & Conditions",
    content: "",
  });
  const [experts, setExperts] = useState<ExpertData[]>([]);
  const [expertsLoading, setExpertsLoading] = useState(false);
  const [isExpertModalOpen, setIsExpertModalOpen] = useState(false);
  const [editingExpertId, setEditingExpertId] = useState<string | null>(null);
  const [expertImageFile, setExpertImageFile] = useState<File | null>(null);
  const [expertForm, setExpertForm] = useState<ExpertFormState>({
    id: "",
    name: "",
    role: "",
    image: "/testimonial-consultation.png",
    experience: "",
    qualifications: "",
    specialties: "",
    languages: "",
    achievement: "",
    stat: "",
    orderIndex: 1,
  });
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogImageFile, setBlogImageFile] = useState<File | null>(null);
  const [blogForm, setBlogForm] = useState<BlogFormState>({
    id: "",
    title: "",
    description: "",
    image: "/testimonial-consultation.png",
    videoUrl: "",
    orderIndex: 1,
  });

  // Database Connection States
  const [dbLoading, setDbLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);

  // Visa management states
  const [visas, setVisas] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [visasLoading, setVisasLoading] = useState(false);
  const [isAddVisaModalOpen, setIsAddVisaModalOpen] = useState(false);

  // Add Visa form state
  const [newVisaName, setNewVisaName] = useState("");
  const [newVisaSubclass, setNewVisaSubclass] = useState("");
  const [newVisaCategoryId, setNewVisaCategoryId] = useState("");
  const [newVisaStatus, setNewVisaStatus] = useState("Published");
  const [newVisaSlug, setNewVisaSlug] = useState("");
  const [newVisaFeaturedImage, setNewVisaFeaturedImage] = useState("");
  const [newVisaHeroBanner, setNewVisaHeroBanner] = useState("");

  // Fetch leads helper
  const fetchLeads = useCallback(async () => {
    const response = await getLeadsAction();
    if (response.success && response.data) {
      setLeads(response.data);
      setDbError(null);
    } else {
      setDbError("Failed to fetch leads from the database. Please check MySQL server status.");
    }
  }, []);

  // Initialize database and fetch data
  const initializePortal = useCallback(async () => {
    setDbLoading(true);
    setDbError(null);
    try {
      const initResult = await initDbAction();
      if (initResult.success) {
        await fetchLeads();
      } else {
        setDbError(
          `MySQL Connection Failed: Database 'gemca_db' could not be reached. ` +
          `Please make sure Apache and MySQL are running in your XAMPP Control Panel, and credentials in .env.local are correct.`
        );
      }
    } catch (err: any) {
      setDbError(`Unexpected initialization error: ${err.message || String(err)}`);
    } finally {
      setDbLoading(false);
    }
  }, [fetchLeads]);

  // Fetch visas and categories helper
  const fetchVisasAndCategories = useCallback(async () => {
    setVisasLoading(true);
    try {
      const visaRes = await getVisaListAction();
      if (visaRes.success && visaRes.data) {
        setVisas(visaRes.data);
      }
      
      let catRes = await getCategoryListAction();
      if (catRes.success && catRes.data) {
        if (catRes.data.length === 0) {
          const defaultCats = [
            { name: "Skilled Migration Visa", slug: "skilled-migration", description: "Point-tested independent or nominated migration." },
            { name: "Employer Sponsored Visa", slug: "employer-sponsored", description: "Visas sponsored by an approved Australian business." },
            { name: "Partner Visa", slug: "partner-visa", description: "Visas for spouses, de facto partners, or prospective marriage partners." },
            { name: "Parent Visa", slug: "parent-visa", description: "Visas for parents of Australian citizens or permanent residents." },
            { name: "Visitor Visa", slug: "visitor-visa", description: "Tourist, business visitor, or sponsored family visitor streams." },
            { name: "Graduate Visa", slug: "graduate-visa", description: "Post-study work pathways for international students." },
            { name: "Business & Investment", slug: "business-investment", description: "For venture capital, business owners, and major investors." },
            { name: "Australian Citizenship", slug: "citizenship", description: "Conferral pathway for eligible residents." }
          ];
          
          for (const cat of defaultCats) {
            await createCategoryAction(cat);
          }
          catRes = await getCategoryListAction();
        }
        
        if (catRes.success && catRes.data) {
          setCategories(catRes.data);
          if (catRes.data.length > 0) {
            setNewVisaCategoryId(catRes.data[0].id);
          }
        }
      } else {
        console.error("Failed to load categories:", catRes.error);
      }
    } catch (e: any) {
      console.error("fetchVisasAndCategories error:", e);
    } finally {
      setVisasLoading(false);
    }
  }, []);

  const fetchExperts = useCallback(async () => {
    setExpertsLoading(true);
    const response = await getExpertsAction();
    if (response.success && response.data) {
      setExperts(response.data);
    }
    setExpertsLoading(false);
  }, []);

  const splitList = (value: string) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const resetExpertForm = () => {
    setEditingExpertId(null);
    setExpertImageFile(null);
    setExpertForm({
      id: "",
      name: "",
      role: "",
      image: "/testimonial-consultation.png",
      experience: "",
      qualifications: "",
      specialties: "",
      languages: "",
      achievement: "",
      stat: "",
      orderIndex: Math.max(experts.length + 1, 1),
    });
  };

  const openNewExpertModal = () => {
    resetExpertForm();
    setIsExpertModalOpen(true);
  };

  const openEditExpertModal = (expert: ExpertData) => {
    setEditingExpertId(expert.id);
    setExpertImageFile(null);
    setExpertForm({
      ...expert,
      qualifications: expert.qualifications.join(", "),
      specialties: expert.specialties.join(", "),
      languages: expert.languages.join(", "),
    });
    setIsExpertModalOpen(true);
  };

  const closeExpertModal = () => {
    setIsExpertModalOpen(false);
    resetExpertForm();
  };

  const handleSaveExpert = async (e: React.FormEvent) => {
    e.preventDefault();
    setExpertsLoading(true);

    let imagePath = expertForm.image || "/testimonial-consultation.png";
    if (expertImageFile) {
      const formData = new FormData();
      formData.append("image", expertImageFile);
      const uploadResult = await uploadExpertImageAction(formData);
      if (!uploadResult.success || !uploadResult.path) {
        alert("Failed to upload expert image: " + (uploadResult.error || "Unknown upload error."));
        setExpertsLoading(false);
        return;
      }
      imagePath = uploadResult.path;
    }

    const payload: ExpertData = {
      id: editingExpertId || `expert-${Date.now()}`,
      name: expertForm.name,
      role: expertForm.role,
      image: imagePath,
      experience: expertForm.experience,
      qualifications: splitList(expertForm.qualifications),
      specialties: splitList(expertForm.specialties),
      languages: splitList(expertForm.languages),
      achievement: expertForm.achievement,
      stat: expertForm.stat,
      orderIndex: Number(expertForm.orderIndex) || 1,
    };

    const result = editingExpertId ? await updateExpertAction(payload) : await createExpertAction(payload);
    if (result.success) {
      await fetchExperts();
      closeExpertModal();
    } else {
      alert("Failed to save expert: " + (result.error || "Unknown database error."));
    }

    setExpertsLoading(false);
  };

  const handleDeleteExpert = async (id: string) => {
    if (!confirm("Are you sure you want to delete this expert from the website?")) return;
    setExpertsLoading(true);
    const result = await deleteExpertAction(id);
    if (result.success) {
      await fetchExperts();
    } else {
      alert("Failed to delete expert: " + (result.error || "Unknown database error."));
    }
    setExpertsLoading(false);
  };

  const fetchBlogs = useCallback(async () => {
    setBlogsLoading(true);
    const response = await getBlogsAction();
    if (response.success && response.data) {
      setBlogs(response.data);
    }
    setBlogsLoading(false);
  }, []);

  const resetBlogForm = () => {
    setEditingBlogId(null);
    setBlogImageFile(null);
    setBlogForm({
      id: "",
      title: "",
      description: "",
      image: "/testimonial-consultation.png",
      videoUrl: "",
      orderIndex: Math.max(blogs.length + 1, 1),
    });
  };

  const openNewBlogModal = () => {
    resetBlogForm();
    setIsBlogModalOpen(true);
  };

  const openEditBlogModal = (blog: BlogData) => {
    setEditingBlogId(blog.id);
    setBlogImageFile(null);
    setBlogForm(blog);
    setIsBlogModalOpen(true);
  };

  const closeBlogModal = () => {
    setIsBlogModalOpen(false);
    resetBlogForm();
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setBlogsLoading(true);

    let imagePath = blogForm.image || "/testimonial-consultation.png";
    if (blogImageFile) {
      const formData = new FormData();
      formData.append("image", blogImageFile);
      const uploadResult = await uploadBlogImageAction(formData);
      if (!uploadResult.success || !uploadResult.path) {
        alert("Failed to upload blog image: " + (uploadResult.error || "Unknown upload error."));
        setBlogsLoading(false);
        return;
      }
      imagePath = uploadResult.path;
    }

    const payload: BlogData = {
      id: editingBlogId || `blog-${Date.now()}`,
      title: blogForm.title,
      description: blogForm.description,
      image: imagePath,
      videoUrl: blogForm.videoUrl,
      orderIndex: Number(blogForm.orderIndex) || 1,
    };

    const result = editingBlogId ? await updateBlogAction(payload) : await createBlogAction(payload);
    if (result.success) {
      await fetchBlogs();
      closeBlogModal();
    } else {
      alert("Failed to save blog: " + (result.error || "Unknown database error."));
    }

    setBlogsLoading(false);
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog from the website?")) return;
    setBlogsLoading(true);
    const result = await deleteBlogAction(id);
    if (result.success) {
      await fetchBlogs();
    } else {
      alert("Failed to delete blog: " + (result.error || "Unknown database error."));
    }
    setBlogsLoading(false);
  };

  const handleCreateVisa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVisaName || !newVisaSubclass || !newVisaCategoryId || !newVisaSlug) {
      alert("Please fill in all required fields.");
      return;
    }
    setVisasLoading(true);
    const payload = {
      name: newVisaName,
      subclass: newVisaSubclass,
      categoryId: newVisaCategoryId,
      status: newVisaStatus,
      slug: newVisaSlug,
      heroImage: newVisaHeroBanner || "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200",
      seoOgImage: newVisaFeaturedImage || "https://images.unsplash.com/photo-1523482596112-c90940cc68e1?q=80&w=800",
      summary: `Detailed eligibility requirements, processes, costs, and checklists for Subclass ${newVisaSubclass} ${newVisaName}.`,
      whoCanApply: "Applicants meeting target age, points grid threshold, suitable skills assessment, and health criteria.",
      stay: newVisaName.toLowerCase().includes("provisional") || newVisaName.toLowerCase().includes("temporary") ? "Temporary / Fixed duration" : "Permanent",
      travel: "Up to 5 years travel rights from visa grant date.",
      work: "Full work rights in Australia.",
      study: "Full study rights in Australia.",
      baseCost: 4765.00,
      effectiveDate: new Date().toISOString(),
      eligibilities: [
        { title: "Age", description: "Must be under 45 years of age when invited to apply." },
        { title: "English Level", description: "Competent English or higher (e.g. IELTS 6.0 overall equivalent)." },
        { title: "Skills Assessment", description: "Hold a positive skills assessment for a nominated occupation." }
      ],
      documents: [
        { name: "Primary Passport Bio-page", category: "Identity", description: "Scan of passport valid for at least 6 months.", required: true },
        { name: "Skills Assessment Outcome Letter", category: "Skills", description: "Positive outcome letter from assessing authority.", required: true },
        { name: "IELTS / PTE Test Score Report", category: "English", description: "Official scorecard confirming test results.", required: true }
      ],
      steps: [
        { title: "Skills Assessment", description: "Lodge and secure a positive skills assessment for your nominated occupation." },
        { title: "Expression of Interest", description: "Submit your profile on SkillSelect with points criteria claimed." },
        { title: "State nomination or Invite", description: "Receive an invitation from DHA or relevant State authority." },
        { title: "Visa Lodgement", description: "Submit the complete visa application and upload all supporting documents." }
      ],
      faqs: [
        { question: `Is Subclass ${newVisaSubclass} a permanent pathway?`, answer: newVisaName.toLowerCase().includes("provisional") ? "No, it is a provisional visa that offers a pathway to permanent residency." : "Yes, this is a direct permanent residency visa." },
        { question: "How long does skills assessment take?", answer: "Processing times vary between 3 to 12 weeks depending on the assessing authority." }
      ]
    };

    const result = await createVisaAction(payload);
    if (result.success) {
      alert("Visa subclass created successfully in MySQL database!");
      setIsAddVisaModalOpen(false);
      setNewVisaName("");
      setNewVisaSubclass("");
      setNewVisaSlug("");
      setNewVisaFeaturedImage("");
      setNewVisaHeroBanner("");
      fetchVisasAndCategories();
    } else {
      alert("Error: " + (result.error || "Failed to save visa subclass."));
    }
    setVisasLoading(false);
  };

  const handleDeleteVisa = async (id: string) => {
    if (confirm("Are you sure you want to delete this visa subclass permanently from the MySQL database?")) {
      setVisasLoading(true);
      const result = await deleteAdminVisaAction(id);
      if (result.success) {
        fetchVisasAndCategories();
      } else {
        alert("Failed to delete visa: " + result.error);
      }
      setVisasLoading(false);
    }
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsMessage("");
    setSettingsError("");

    if (passwordForm.newPassword.length < 8) {
      setSettingsError("New password must be at least 8 characters long.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setSettingsError("New password and confirm password do not match.");
      return;
    }

    const saved = updatePassword(passwordForm.currentPassword, passwordForm.newPassword);
    if (!saved) {
      setSettingsError("Current password is incorrect.");
      return;
    }

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    setSettingsMessage("Admin password updated successfully. Use the new password on next login.");
  };

  const fetchTermsPage = useCallback(async () => {
    setTermsLoading(true);
    const response = await getSitePageAction("terms-and-conditions");
    if (response.success && response.data) {
      setTermsForm({
        title: response.data.title,
        content: response.data.content,
      });
    } else if (response.data) {
      setTermsForm({
        title: response.data.title,
        content: response.data.content,
      });
    }
    setTermsLoading(false);
  }, []);

  const handleTermsUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsMessage("");
    setSettingsError("");
    setTermsLoading(true);

    const result = await updateSitePageAction({
      slug: "terms-and-conditions",
      title: termsForm.title,
      content: termsForm.content,
    });

    if (result.success) {
      setSettingsMessage("Terms & Conditions page updated successfully.");
      await fetchTermsPage();
    } else {
      setSettingsError(result.error || "Failed to update Terms & Conditions page.");
    }

    setTermsLoading(false);
  };

  useEffect(() => {
    initializePortal();
    fetchVisasAndCategories();
    fetchExperts();
    fetchBlogs();
    fetchTermsPage();
  }, [initializePortal, fetchVisasAndCategories, fetchExperts, fetchBlogs, fetchTermsPage]);

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  // Add random lead helper (Saves to MySQL)
  const handleAddMockLead = async () => {
    const mockNames = ["Amara Okafor", "Priya Patel", "Devon Miller", "Carlos Ruiz", "Yuki Sato"];
    const mockEmails = ["amara@example.com", "priya.p@example.com", "devon@example.com", "c.ruiz@example.com", "yuki@example.com"];
    const mockPhones = ["+61 411 222 333", "+61 422 333 444", "+61 455 666 777", "+61 499 888 777", "+61 466 555 444"];
    const mockPathways = [
      "Student Visa (Subclass 500)", 
      "Skilled Nominated (Subclass 190)", 
      "Temporary Graduate (Subclass 485)", 
      "Partner Visa (Subclass 820)",
      "Skilled Regional (Subclass 491)"
    ];
    const mockStatuses: Array<Lead["status"]> = ["New", "In Progress", "Action Required"];
    const mockNotes = [
      "Initial assessment needed. Client wants to study nursing in Sydney.",
      "Points calculations indicate 90 points. Waiting on ACS skills review.",
      "Checking TR 485 stream eligibility post-study pathway change.",
      "Requires document checklist for partner relationship evidence.",
      "Regional nomination criteria checked. Eligible for Victoria stream."
    ];

    const randomIndex = Math.floor(Math.random() * mockNames.length);
    const randomStatusIndex = Math.floor(Math.random() * mockStatuses.length);
    const today = new Date().toISOString().split('T')[0];

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: mockNames[randomIndex],
      email: mockEmails[randomIndex],
      phone: mockPhones[randomIndex],
      pathway: mockPathways[randomIndex],
      status: mockStatuses[randomStatusIndex],
      date: today,
      notes: mockNotes[randomIndex]
    };

    setDbLoading(true);
    const result = await addLeadAction(newLead);
    if (result.success) {
      await fetchLeads();
    } else {
      alert("Failed to insert mock lead into database.");
    }
    setDbLoading(false);
  };

  // Delete lead helper (Deletes from MySQL)
  const handleDeleteLead = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to remove this lead from MySQL database permanently?")) {
      setDbLoading(true);
      const result = await deleteLeadAction(id);
      if (result.success) {
        await fetchLeads();
        if (activeLead?.id === id) {
          setActiveLead(null);
        }
      } else {
        alert("Failed to delete lead from database.");
      }
      setDbLoading(false);
    }
  };

  const parseInquiryNotes = (notes: string) => {
    const location = notes.match(/^Location:\s*(.*)$/m)?.[1] || "";
    const preferredTime = notes.match(/^Preferred contact time:\s*(.*)$/m)?.[1] || "";
    const message = notes.match(/^Message:\s*([\s\S]*)$/m)?.[1] || notes;
    return { location, preferredTime, message: message.trim() };
  };

  const buildInquiryNotes = () => {
    return [
      "Consultation request from header form.",
      `Location: ${inquiryForm.location}`,
      `Preferred contact time: ${inquiryForm.preferredTime}`,
      `Message: ${inquiryForm.message}`,
    ].join("\n");
  };

  const resetInquiryForm = () => {
    setEditingInquiryId(null);
    setInquiryForm({
      name: "",
      email: "",
      phone: "",
      pathway: "General Migration Consultation",
      status: "New",
      location: "",
      preferredTime: "",
      message: ""
    });
  };

  const openNewInquiryModal = () => {
    resetInquiryForm();
    setIsInquiryModalOpen(true);
  };

  const openEditInquiryModal = (lead: Lead, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const parsed = parseInquiryNotes(lead.notes);
    setEditingInquiryId(lead.id);
    setInquiryForm({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      pathway: lead.pathway || "General Migration Consultation",
      status: lead.status,
      location: parsed.location,
      preferredTime: parsed.preferredTime,
      message: parsed.message
    });
    setIsInquiryModalOpen(true);
  };

  const closeInquiryModal = () => {
    setIsInquiryModalOpen(false);
    resetInquiryForm();
  };

  const handleSaveInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split("T")[0];
    const payload: Lead = {
      id: editingInquiryId || `lead-${Date.now()}`,
      name: inquiryForm.name,
      email: inquiryForm.email,
      phone: inquiryForm.phone,
      pathway: inquiryForm.pathway,
      status: inquiryForm.status,
      date: today,
      notes: buildInquiryNotes()
    };

    setDbLoading(true);
    const result = editingInquiryId ? await updateLeadAction(payload) : await addLeadAction(payload);
    if (result.success) {
      await fetchLeads();
      closeInquiryModal();
      if (activeLead?.id === payload.id) {
        setActiveLead(payload);
      }
    } else {
      alert(result.error || "Failed to save inquiry.");
    }
    setDbLoading(false);
  };

  // Update lead status helper (Updates in MySQL)
  const handleUpdateStatus = async (id: string, newStatus: Lead["status"], e?: React.ChangeEvent<HTMLSelectElement>) => {
    if (e) e.stopPropagation();
    
    setDbLoading(true);
    const result = await updateLeadStatusAction(id, newStatus);
    if (result.success) {
      await fetchLeads();
      if (activeLead && activeLead.id === id) {
        setActiveLead(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } else {
      alert("Failed to update status in database.");
    }
    setDbLoading(false);
  };

  // Stats calculation
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === "New").length;
  const inProgressLeads = leads.filter(l => l.status === "In Progress").length;
  const approvedLeads = leads.filter(l => l.status === "Approved").length;
  const actionRequiredLeads = leads.filter(l => l.status === "Action Required").length;
  const inquiries = leads.filter((lead) => lead.notes.includes("Consultation request from header form."));
  const newInquiries = inquiries.filter((lead) => lead.status === "New").length;
  const careerApplications = leads.filter((lead) => lead.pathway.startsWith("Career Application"));
  const newCareerApplications = careerApplications.filter((lead) => lead.status === "New").length;

  // Filter and search logic
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.pathway.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === "All" || lead.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const filteredInquiries = inquiries.filter(lead => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.pathway.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === "All" || lead.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const filteredCareerApplications = careerApplications.filter(lead => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.pathway.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === "All" || lead.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#070b12] text-white flex flex-col md:flex-row font-sans overflow-hidden">
        
        {/* Mobile Sidebar Overlay Dim Backdrop */}
        {isMobileMenuOpen && (
          <div 
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />
        )}

        {/* 1. Fixed Left Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/5 bg-[#090e1b] transition-transform duration-300 md:translate-x-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          {/* Sidebar Header branding */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-white/5 shrink-0">
            <div className="flex items-center gap-3">
              <GemcaLogo className="h-8 text-white" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37] border border-[#d4af37]/20 px-1.5 py-0.5 rounded">
                Admin
              </span>
            </div>
            {/* Close mobile menu trigger */}
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1 border border-white/10 hover:border-white/20 rounded-md text-white/50 hover:text-white md:hidden transition-all cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Sidebar Navigation Items */}
          <nav className="flex-1 space-y-1.5 px-4 py-6 overflow-y-auto">
            
            {/* Leads Database Item (Active Status) */}
            <button
              onClick={() => { setActiveTab("leads"); setIsMobileMenuOpen(false); }}
              className={`flex w-full items-center gap-3.5 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "leads"
                  ? "bg-gradient-to-r from-[#d4af37]/10 to-transparent text-[#d4af37] border-l-2 border-[#d4af37]"
                  : "text-white/60 hover:text-white hover:bg-white/[0.02]"
              }`}
            >
              <Users size={16} className={activeTab === "leads" ? "text-[#d4af37]" : "text-white/40"} />
              Leads
            </button>

            {/* Inquiry Management Item */}
            <button
              onClick={() => { setActiveTab("inquiries"); setIsMobileMenuOpen(false); }}
              className={`flex w-full items-center gap-3.5 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "inquiries"
                  ? "bg-gradient-to-r from-[#d4af37]/10 to-transparent text-[#d4af37] border-l-2 border-[#d4af37]"
                  : "text-white/60 hover:text-white hover:bg-white/[0.02]"
              }`}
            >
              <MessageSquare size={16} className={activeTab === "inquiries" ? "text-[#d4af37]" : "text-white/40"} />
              Inquiry
              {newInquiries > 0 && (
                <span className="ml-auto rounded-full bg-[#d4af37] px-2 py-0.5 text-[10px] font-black text-black">
                  {newInquiries}
                </span>
              )}
            </button>

            <button
              onClick={() => { setActiveTab("careers"); setIsMobileMenuOpen(false); }}
              className={`flex w-full items-center gap-3.5 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "careers"
                  ? "bg-gradient-to-r from-[#d4af37]/10 to-transparent text-[#d4af37] border-l-2 border-[#d4af37]"
                  : "text-white/60 hover:text-white hover:bg-white/[0.02]"
              }`}
            >
              <BriefcaseBusiness size={16} className={activeTab === "careers" ? "text-[#d4af37]" : "text-white/40"} />
              Job Inquiry
              {newCareerApplications > 0 && (
                <span className="ml-auto rounded-full bg-[#d4af37] px-2 py-0.5 text-[10px] font-black text-black">
                  {newCareerApplications}
                </span>
              )}
            </button>

            {/* Visa Management Item */}
            <button
              onClick={() => { setActiveTab("visas"); setIsMobileMenuOpen(false); }}
              className={`flex w-full items-center gap-3.5 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "visas"
                  ? "bg-gradient-to-r from-[#d4af37]/10 to-transparent text-[#d4af37] border-l-2 border-[#d4af37]"
                  : "text-white/60 hover:text-white hover:bg-white/[0.02]"
              }`}
            >
              <FileText size={16} className={activeTab === "visas" ? "text-[#d4af37]" : "text-white/40"} />
              Visa Management
            </button>

            <button
              onClick={() => { setActiveTab("experts"); setIsMobileMenuOpen(false); }}
              className={`flex w-full items-center gap-3.5 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "experts"
                  ? "bg-gradient-to-r from-[#d4af37]/10 to-transparent text-[#d4af37] border-l-2 border-[#d4af37]"
                  : "text-white/60 hover:text-white hover:bg-white/[0.02]"
              }`}
            >
              <Users size={16} className={activeTab === "experts" ? "text-[#d4af37]" : "text-white/40"} />
              Experts
              {experts.length > 0 && (
                <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-black text-white/60">
                  {experts.length}
                </span>
              )}
            </button>

            <button
              onClick={() => { setActiveTab("blogs"); setIsMobileMenuOpen(false); }}
              className={`flex w-full items-center gap-3.5 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "blogs"
                  ? "bg-gradient-to-r from-[#d4af37]/10 to-transparent text-[#d4af37] border-l-2 border-[#d4af37]"
                  : "text-white/60 hover:text-white hover:bg-white/[0.02]"
              }`}
            >
              <FileText size={16} className={activeTab === "blogs" ? "text-[#d4af37]" : "text-white/40"} />
              Blogs
              {blogs.length > 0 && (
                <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-black text-white/60">
                  {blogs.length}
                </span>
              )}
            </button>

            {/* Mock Navs for UI depth */}
            <button
              onClick={() => alert("Analytics module initialized: Loading points matrices & state nominated records...")}
              className="flex w-full items-center gap-3.5 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white hover:bg-white/[0.02] transition-all cursor-pointer"
            >
              <Layers size={16} className="text-white/40" />
              Analytics Reports
            </button>

            <button
              onClick={() => alert("Document checklist manager initialized: Loading visa templates...")}
              className="flex w-full items-center gap-3.5 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white hover:bg-white/[0.02] transition-all cursor-pointer"
            >
              <FileSpreadsheet size={16} className="text-white/40" />
              Document Vault
            </button>

            <button
              onClick={() => { setActiveTab("settings"); setIsMobileMenuOpen(false); }}
              className={`flex w-full items-center gap-3.5 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "settings"
                  ? "bg-gradient-to-r from-[#d4af37]/10 to-transparent text-[#d4af37] border-l-2 border-[#d4af37]"
                  : "text-white/60 hover:text-white hover:bg-white/[0.02]"
              }`}
            >
              <Settings size={16} className={activeTab === "settings" ? "text-[#d4af37]" : "text-white/40"} />
              Settings
            </button>

          </nav>

          {/* Sidebar Profile & Logout Panel */}
          <div className="border-t border-white/5 bg-white/[0.005] p-5 shrink-0 space-y-4">
            
            {/* Database indicator */}
            <div className="flex items-center justify-between rounded-lg bg-black/35 border border-white/5 p-2.5">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">MySQL Link</span>
              <span className="text-[10px] font-black text-green-400 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                ONLINE
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#2e5fa3] flex items-center justify-center font-bold text-black border border-white/10 shrink-0">
                AG
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-white truncate">{user?.name || "Ansar Goraya"}</p>
                <p className="text-[9px] uppercase tracking-wider text-white/40 font-bold truncate">Principal Consultant</p>
              </div>
            </div>

            <button 
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 border border-white/10 hover:border-red-500/30 hover:bg-red-500/5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white/70 hover:text-red-400 transition-all cursor-pointer"
            >
              <LogOut size={14} />
              Logout Session
            </button>
          </div>
        </aside>

        {/* 2. Mobile Header Bar (Only visible on mobile) */}
        <header className="md:hidden flex items-center justify-between border-b border-white/5 bg-[#090e1b]/95 backdrop-blur-md px-6 py-4 sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1.5 border border-white/10 rounded-md text-white/70 hover:text-white cursor-pointer"
            >
              <Menu size={20} />
            </button>
            <GemcaLogo className="h-7 text-white" />
          </div>
          <button 
            onClick={handleLogout}
            className="p-1.5 border border-white/10 hover:border-red-500/20 hover:bg-red-500/5 text-white/70 hover:text-red-400 rounded-md transition-colors cursor-pointer"
          >
            <LogOut size={16} />
          </button>
        </header>

        {/* 3. Main Dashboard Frame */}
        <div className="flex-1 flex flex-col min-w-0 md:pl-72 h-screen overflow-y-auto">
          
          {/* Desktop Top Welcome Row (Hidden on mobile) */}
          <div className="hidden md:flex h-16 items-center justify-between border-b border-white/5 bg-[#090e1b]/30 px-8 shrink-0">
            <div className="text-xs font-bold text-white/55 flex items-center gap-2">
              <Clock size={13} className="text-[#d4af37]" />
              Welcome back, <span className="text-white font-black">{user?.name || "Ansar Goraya"}</span> | Portal connected to database
            </div>
            
            <div className="flex items-center gap-4 text-xs font-bold text-white/40">
              <span>Host: <span className="text-white/60 font-mono">127.0.0.1</span></span>
              <span className="h-3 w-[1px] bg-white/10" />
              <span>DB: <span className="text-white/60 font-mono">gemca_db</span></span>
            </div>
          </div>

          {/* Database Offline Error Banner */}
          {dbError && (
            <div className="bg-red-500/10 border-b border-red-500/20 text-red-200 px-8 py-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Database className="text-red-400 mt-0.5 shrink-0" size={20} />
                  <div>
                    <p className="font-bold text-sm">Database Offline Mode</p>
                    <p className="text-xs text-red-200/70 mt-0.5">{dbError}</p>
                  </div>
                </div>
                <button 
                  onClick={initializePortal}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-xs font-bold uppercase tracking-wider rounded border border-red-500/30 text-white cursor-pointer transition-colors shrink-0"
                >
                  <RefreshCw size={12} />
                  Retry Connection
                </button>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <main className="flex-1 p-6 sm:p-8 md:p-10 space-y-8 max-w-[1600px] w-full">
            {activeTab === "visas" ? (
              // --- VISA MANAGEMENT VIEW ---
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-black uppercase tracking-wide flex items-center gap-3">
                      Visa Subclasses
                      {visasLoading && <RefreshCw className="animate-spin text-[#d4af37]" size={20} />}
                    </h1>
                    <p className="text-sm text-white/50 flex items-center gap-1.5">
                      <Database size={14} className="text-[#d4af37]" />
                      Database Table: <span className="font-mono text-xs text-[#d4af37] bg-white/[0.02] border border-white/5 px-2 py-0.5 rounded">gemca_db.visas</span>
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => setIsAddVisaModalOpen(true)}
                    className="flex items-center gap-2 bg-[#d4af37] hover:bg-[#bfa032] text-black font-black uppercase tracking-wider text-xs px-5 py-3 rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    <Plus size={16} />
                    Add Visa Subclass
                  </button>
                </div>

                {/* Visas List Table */}
                <div className="border border-white/5 bg-white/[0.01] rounded-xl overflow-hidden shadow-xl animate-fade-in">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border-spacing-0">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/[0.005] text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                          <th className="py-4 px-6">Subclass / Name</th>
                          <th className="py-4 px-6">Category</th>
                          <th className="py-4 px-6">Slug</th>
                          <th className="py-4 px-6">Status</th>
                          <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-sm font-semibold">
                        {visas.length > 0 ? (
                          visas.map((visa) => (
                            <tr key={visa.id} className="hover:bg-white/[0.015] transition-colors">
                              <td className="py-4 px-6">
                                <span className="text-xs font-black uppercase bg-[#2e5fa3]/10 text-[#6ea3ec] border border-[#2e5fa3]/20 px-2 py-0.5 rounded mr-3">
                                  {visa.subclass}
                                </span>
                                <span className="font-bold text-white">{visa.name}</span>
                              </td>
                              <td className="py-4 px-6 text-white/60">
                                {visa.category?.name || "Uncategorized"}
                              </td>
                              <td className="py-4 px-6 font-mono text-xs text-white/40">
                                {visa.slug}
                              </td>
                              <td className="py-4 px-6">
                                <span className={`inline-flex px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                                  visa.status === "Published" || visa.status === "Current"
                                    ? "bg-green-500/10 text-green-400 border border-green-500/15"
                                    : "bg-white/10 text-white/60 border border-white/5"
                                }`}>
                                  {visa.status}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <a 
                                    href={`/visa?slug=${visa.slug}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-2 border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] rounded-lg text-white/70 hover:text-white transition-all inline-flex items-center"
                                    title="View Live Page"
                                  >
                                    <Eye size={14} />
                                  </a>
                                  <button 
                                    onClick={() => handleDeleteVisa(visa.id)}
                                    className="p-2 border border-white/5 hover:border-red-500/20 bg-red-500/5 hover:bg-red-500/10 rounded-lg text-red-400/70 hover:text-red-400 transition-all cursor-pointer"
                                    title="Delete Visa"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="py-12 text-center text-white/30">
                              {visasLoading ? "Loading Visas..." : "No custom visa subclasses found in database."}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-4 border-t border-white/5 bg-white/[0.005] text-xs text-white/40 flex items-center justify-between">
                    <span>Total Subclasses: {visas.length}</span>
                    <span className="flex items-center gap-1 font-bold">
                      <Database size={11} className="text-[#d4af37]" /> Connected: MySQL
                    </span>
                  </div>
                </div>
              </div>
            ) : activeTab === "inquiries" ? (
              // --- INQUIRY MANAGEMENT VIEW ---
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-black uppercase tracking-wide flex items-center gap-3">
                      Consultation Inquiries
                      {dbLoading && (
                        <RefreshCw className="animate-spin text-[#d4af37]" size={20} />
                      )}
                    </h1>
                    <p className="text-sm text-white/50 flex items-center gap-1.5">
                      <Database size={14} className="text-[#d4af37]" />
                      Header form records from <span className="font-mono text-xs text-[#d4af37] bg-white/[0.02] border border-white/5 px-2 py-0.5 rounded">gemca_db.leads</span>
                    </p>
                  </div>

                  <button
                    onClick={openNewInquiryModal}
                    disabled={!!dbError}
                    className="flex items-center gap-2 bg-[#d4af37] hover:bg-[#bfa032] disabled:opacity-40 disabled:cursor-not-allowed text-black font-black uppercase tracking-wider text-xs px-5 py-3 rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    <Plus size={16} />
                    Add Inquiry
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="border border-white/5 bg-white/[0.01] rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black uppercase tracking-widest text-white/50">Total Inquiry</span>
                      <MessageSquare size={18} className="text-[#6ea3ec]" />
                    </div>
                    <span className="text-3xl font-black">{inquiries.length}</span>
                    <p className="text-xs text-white/40 mt-2">Submitted through Book Consult</p>
                  </div>
                  <div className="border border-white/5 bg-white/[0.01] rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black uppercase tracking-widest text-white/50">New</span>
                      <FileText size={18} className="text-[#d4af37]" />
                    </div>
                    <span className="text-3xl font-black text-[#d4af37]">{newInquiries}</span>
                    <p className="text-xs text-white/40 mt-2">Need first response</p>
                  </div>
                  <div className="border border-white/5 bg-white/[0.01] rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black uppercase tracking-widest text-white/50">Active</span>
                      <PhoneCall size={18} className="text-orange-400" />
                    </div>
                    <span className="text-3xl font-black text-orange-400">
                      {inquiries.filter((lead) => lead.status === "In Progress").length}
                    </span>
                    <p className="text-xs text-white/40 mt-2">Currently being handled</p>
                  </div>
                </div>

                <div className="border border-white/5 bg-white/[0.01] rounded-xl overflow-hidden shadow-xl">
                  <div className="p-5 border-b border-white/5 bg-white/[0.01] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1">
                      {["All", "New", "In Progress", "Approved", "Action Required"].map((status) => (
                        <button
                          key={status}
                          onClick={() => setSelectedStatus(status)}
                          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            selectedStatus === status
                              ? "bg-white/10 text-white border border-white/10"
                              : "text-white/55 hover:text-white hover:bg-white/[0.02] border border-transparent"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>

                    <div className="relative w-full lg:w-80">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                      <input
                        type="text"
                        placeholder="Search inquiry..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-lg border border-white/5 bg-white/[0.03] pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/30 transition-all focus:border-[#d4af37] focus:bg-white/[0.06] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border-spacing-0">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/[0.005] text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                          <th className="py-4 px-6">Client</th>
                          <th className="py-4 px-6">Service</th>
                          <th className="py-4 px-6">Phone</th>
                          <th className="py-4 px-6">Date</th>
                          <th className="py-4 px-6">Status</th>
                          <th className="py-4 px-6 text-right">CRUD</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-sm font-semibold">
                        {filteredInquiries.length > 0 ? (
                          filteredInquiries.map((lead) => (
                            <tr
                              key={lead.id}
                              onClick={() => setActiveLead(lead)}
                              className="hover:bg-white/[0.015] transition-colors cursor-pointer group"
                            >
                              <td className="py-4 px-6">
                                <p className="font-bold text-white group-hover:text-[#d4af37] transition-colors">{lead.name}</p>
                                <p className="text-xs text-white/40 font-mono mt-0.5">{lead.email}</p>
                              </td>
                              <td className="py-4 px-6 text-white/75">{lead.pathway}</td>
                              <td className="py-4 px-6 text-xs text-white/55 font-mono">{lead.phone}</td>
                              <td className="py-4 px-6 text-xs text-white/55 font-mono">{lead.date}</td>
                              <td className="py-4 px-6">
                                <select
                                  value={lead.status}
                                  onClick={(e) => e.stopPropagation()}
                                  onChange={(e) => handleUpdateStatus(lead.id, e.target.value as Lead["status"], e)}
                                  className="bg-[#090e1b] border border-white/10 rounded px-2 py-1 text-xs text-white/70 focus:outline-none focus:border-[#d4af37] cursor-pointer"
                                >
                                  <option value="New">New</option>
                                  <option value="In Progress">In Progress</option>
                                  <option value="Approved">Approved</option>
                                  <option value="Action Required">Action Required</option>
                                </select>
                              </td>
                              <td className="py-4 px-6 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveLead(lead);
                                    }}
                                    className="p-2 border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] rounded-lg text-white/70 hover:text-white transition-all cursor-pointer"
                                    title="Read inquiry"
                                  >
                                    <Eye size={14} />
                                  </button>
                                  <button
                                    onClick={(e) => openEditInquiryModal(lead, e)}
                                    className="p-2 border border-white/10 hover:border-[#d4af37]/30 bg-[#d4af37]/5 hover:bg-[#d4af37]/10 rounded-lg text-[#d4af37] transition-all cursor-pointer"
                                    title="Edit inquiry"
                                  >
                                    <Pencil size={14} />
                                  </button>
                                  <button
                                    onClick={(e) => handleDeleteLead(lead.id, e)}
                                    className="p-2 border border-white/5 hover:border-red-500/20 bg-red-500/5 hover:bg-red-500/10 rounded-lg text-red-400/70 hover:text-red-400 transition-all cursor-pointer"
                                    title="Delete inquiry"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="py-12 text-center text-white/30">
                              {dbLoading ? "Loading inquiries..." : "No Book Consult inquiries found."}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="p-4 border-t border-white/5 bg-white/[0.005] text-xs text-white/40 flex items-center justify-between">
                    <span>Showing {filteredInquiries.length} of {inquiries.length} inquiries</span>
                    <span className="flex items-center gap-1 font-bold">
                      <Database size={11} className="text-[#d4af37]" /> CRUD enabled
                    </span>
                  </div>
                </div>
              </div>
            ) : activeTab === "careers" ? (
              // --- JOB INQUIRY / CAREER APPLICATION VIEW ---
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-black uppercase tracking-wide flex items-center gap-3">
                      Job Inquiries
                      {dbLoading && (
                        <RefreshCw className="animate-spin text-[#d4af37]" size={20} />
                      )}
                    </h1>
                    <p className="text-sm text-white/50 flex items-center gap-1.5">
                      <Database size={14} className="text-[#d4af37]" />
                      Resume applications from <span className="font-mono text-xs text-[#d4af37] bg-white/[0.02] border border-white/5 px-2 py-0.5 rounded">/career</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="border border-white/5 bg-white/[0.01] rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black uppercase tracking-widest text-white/50">Applications</span>
                      <BriefcaseBusiness size={18} className="text-[#d4af37]" />
                    </div>
                    <span className="text-3xl font-black">{careerApplications.length}</span>
                    <p className="text-xs text-white/40 mt-2">Submitted from career form</p>
                  </div>
                  <div className="border border-white/5 bg-white/[0.01] rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black uppercase tracking-widest text-white/50">New</span>
                      <FileText size={18} className="text-[#d4af37]" />
                    </div>
                    <span className="text-3xl font-black text-[#d4af37]">{newCareerApplications}</span>
                    <p className="text-xs text-white/40 mt-2">Need review</p>
                  </div>
                  <div className="border border-white/5 bg-white/[0.01] rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black uppercase tracking-widest text-white/50">In Review</span>
                      <PhoneCall size={18} className="text-orange-400" />
                    </div>
                    <span className="text-3xl font-black text-orange-400">
                      {careerApplications.filter((lead) => lead.status === "In Progress").length}
                    </span>
                    <p className="text-xs text-white/40 mt-2">Being handled</p>
                  </div>
                </div>

                <div className="border border-white/5 bg-white/[0.01] rounded-xl overflow-hidden shadow-xl">
                  <div className="p-5 border-b border-white/5 bg-white/[0.01] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1">
                      {["All", "New", "In Progress", "Approved", "Action Required"].map((status) => (
                        <button
                          key={status}
                          onClick={() => setSelectedStatus(status)}
                          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            selectedStatus === status
                              ? "bg-white/10 text-white border border-white/10"
                              : "text-white/55 hover:text-white hover:bg-white/[0.02] border border-transparent"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>

                    <div className="relative w-full lg:w-80">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                      <input
                        type="text"
                        placeholder="Search job inquiry..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-lg border border-white/5 bg-white/[0.03] pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/30 transition-all focus:border-[#d4af37] focus:bg-white/[0.06] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border-spacing-0">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/[0.005] text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                          <th className="py-4 px-6">Candidate</th>
                          <th className="py-4 px-6">Role</th>
                          <th className="py-4 px-6">Resume</th>
                          <th className="py-4 px-6">Date</th>
                          <th className="py-4 px-6">Status</th>
                          <th className="py-4 px-6 text-right">CRUD</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-sm font-semibold">
                        {filteredCareerApplications.length > 0 ? (
                          filteredCareerApplications.map((lead) => {
                            const resumePath = lead.notes.match(/^Resume:\s*(.*)$/m)?.[1] || "";
                            const role = lead.notes.match(/^Role:\s*(.*)$/m)?.[1] || lead.pathway.replace("Career Application - ", "");

                            return (
                              <tr key={lead.id} onClick={() => setActiveLead(lead)} className="hover:bg-white/[0.015] transition-colors cursor-pointer group">
                                <td className="py-4 px-6">
                                  <p className="font-bold text-white group-hover:text-[#d4af37] transition-colors">{lead.name}</p>
                                  <p className="text-xs text-white/40 font-mono mt-0.5">{lead.email}</p>
                                  <p className="text-xs text-white/40 font-mono mt-0.5">{lead.phone}</p>
                                </td>
                                <td className="py-4 px-6 text-white/75">{role}</td>
                                <td className="py-4 px-6">
                                  {resumePath ? (
                                    <a
                                      href={resumePath}
                                      target="_blank"
                                      rel="noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="inline-flex items-center gap-2 rounded-lg border border-[#d4af37]/20 bg-[#d4af37]/10 px-3 py-2 text-xs font-black uppercase tracking-wider text-[#d4af37] hover:bg-[#d4af37]/15"
                                    >
                                      <FileText size={13} />
                                      Resume
                                    </a>
                                  ) : (
                                    <span className="text-xs text-white/30">No file</span>
                                  )}
                                </td>
                                <td className="py-4 px-6 text-xs text-white/55 font-mono">{lead.date}</td>
                                <td className="py-4 px-6">
                                  <select
                                    value={lead.status}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => handleUpdateStatus(lead.id, e.target.value as Lead["status"], e)}
                                    className="bg-[#090e1b] border border-white/10 rounded px-2 py-1 text-xs text-white/70 focus:outline-none focus:border-[#d4af37] cursor-pointer"
                                  >
                                    <option value="New">New</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Action Required">Action Required</option>
                                  </select>
                                </td>
                                <td className="py-4 px-6 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveLead(lead);
                                      }}
                                      className="p-2 border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] rounded-lg text-white/70 hover:text-white transition-all cursor-pointer"
                                      title="Read application"
                                    >
                                      <Eye size={14} />
                                    </button>
                                    <button
                                      onClick={(e) => handleDeleteLead(lead.id, e)}
                                      className="p-2 border border-white/5 hover:border-red-500/20 bg-red-500/5 hover:bg-red-500/10 rounded-lg text-red-400/70 hover:text-red-400 transition-all cursor-pointer"
                                      title="Delete application"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan={6} className="py-12 text-center text-white/30">
                              {dbLoading ? "Loading job inquiries..." : "No career applications found."}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="p-4 border-t border-white/5 bg-white/[0.005] text-xs text-white/40 flex items-center justify-between">
                    <span>Showing {filteredCareerApplications.length} of {careerApplications.length} job inquiries</span>
                    <span className="flex items-center gap-1 font-bold">
                      <Database size={11} className="text-[#d4af37]" /> Resume upload enabled
                    </span>
                  </div>
                </div>
              </div>
            ) : activeTab === "experts" ? (
              // --- EXPERT MANAGEMENT VIEW ---
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-black uppercase tracking-wide flex items-center gap-3">
                      Expert Management
                      {expertsLoading && (
                        <RefreshCw className="animate-spin text-[#d4af37]" size={20} />
                      )}
                    </h1>
                    <p className="text-sm text-white/50 flex items-center gap-1.5">
                      <Database size={14} className="text-[#d4af37]" />
                      Meet Experts page records from <span className="font-mono text-xs text-[#d4af37] bg-white/[0.02] border border-white/5 px-2 py-0.5 rounded">gemca_db.experts</span>
                    </p>
                  </div>

                  <button
                    onClick={openNewExpertModal}
                    className="flex items-center gap-2 bg-[#d4af37] hover:bg-[#bfa032] text-black font-black uppercase tracking-wider text-xs px-5 py-3 rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    <Plus size={16} />
                    Add Expert
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="border border-white/5 bg-white/[0.01] rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black uppercase tracking-widest text-white/50">Total Experts</span>
                      <Users size={18} className="text-[#d4af37]" />
                    </div>
                    <span className="text-3xl font-black">{experts.length}</span>
                    <p className="text-xs text-white/40 mt-2">Visible on Meet Experts page</p>
                  </div>
                  <div className="border border-white/5 bg-white/[0.01] rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black uppercase tracking-widest text-white/50">Top Profile</span>
                      <Award size={18} className="text-[#6ea3ec]" />
                    </div>
                    <span className="text-lg font-black uppercase text-[#d4af37]">{experts[0]?.name || "No expert"}</span>
                    <p className="text-xs text-white/40 mt-2">Ordered by display priority</p>
                  </div>
                  <div className="border border-white/5 bg-white/[0.01] rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black uppercase tracking-widest text-white/50">CRUD</span>
                      <Pencil size={18} className="text-green-400" />
                    </div>
                    <span className="text-lg font-black uppercase text-green-400">Enabled</span>
                    <p className="text-xs text-white/40 mt-2">Add, edit and delete records</p>
                  </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-3">
                  {experts.length > 0 ? (
                    experts.map((expert) => (
                      <article key={expert.id} className="overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] shadow-xl">
                        <div className="relative h-48 bg-[#090f1e]">
                          <img src={expert.image} alt={expert.name} className="h-full w-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#090f1e] via-transparent to-transparent" />
                          <span className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/35 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white">
                            {expert.experience}
                          </span>
                          <span className="absolute right-4 top-4 rounded-full bg-[#d4af37] px-2.5 py-1 text-[10px] font-black text-black">
                            #{expert.orderIndex}
                          </span>
                        </div>
                        <div className="p-5">
                          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#d4af37]">{expert.role}</p>
                          <h2 className="mt-2 text-xl font-black uppercase text-white">{expert.name}</h2>
                          <p className="mt-3 min-h-12 text-sm leading-6 text-white/55">{expert.achievement}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {expert.specialties.slice(0, 3).map((item) => (
                              <span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white/55">
                                {item}
                              </span>
                            ))}
                          </div>
                          <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                            <span className="text-xs font-black uppercase tracking-wider text-white/40">Stat: <span className="text-[#d4af37]">{expert.stat}</span></span>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => openEditExpertModal(expert)}
                                className="p-2 border border-white/10 hover:border-[#d4af37]/30 bg-[#d4af37]/5 hover:bg-[#d4af37]/10 rounded-lg text-[#d4af37] transition-all cursor-pointer"
                                title="Edit expert"
                              >
                                <Pencil size={14} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteExpert(expert.id)}
                                className="p-2 border border-white/5 hover:border-red-500/20 bg-red-500/5 hover:bg-red-500/10 rounded-lg text-red-400/70 hover:text-red-400 transition-all cursor-pointer"
                                title="Delete expert"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className="col-span-full rounded-xl border border-white/5 bg-white/[0.01] p-12 text-center text-white/35">
                      {expertsLoading ? "Loading experts..." : "No experts found. Add the first expert to show it on Meet Experts page."}
                    </div>
                  )}
                </div>
              </div>
            ) : activeTab === "blogs" ? (
              // --- BLOG MANAGEMENT VIEW ---
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-black uppercase tracking-wide flex items-center gap-3">
                      Blog Management
                      {blogsLoading && (
                        <RefreshCw className="animate-spin text-[#d4af37]" size={20} />
                      )}
                    </h1>
                    <p className="text-sm text-white/50 flex items-center gap-1.5">
                      <Database size={14} className="text-[#d4af37]" />
                      Meet Experts blog records from <span className="font-mono text-xs text-[#d4af37] bg-white/[0.02] border border-white/5 px-2 py-0.5 rounded">gemca_db.blogs</span>
                    </p>
                  </div>
                  <button
                    onClick={openNewBlogModal}
                    className="flex items-center gap-2 bg-[#d4af37] hover:bg-[#bfa032] text-black font-black uppercase tracking-wider text-xs px-5 py-3 rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    <Plus size={16} />
                    Add Blog
                  </button>
                </div>

                <div className="grid gap-5 lg:grid-cols-3">
                  {blogs.length > 0 ? (
                    blogs.map((blog) => (
                      <article key={blog.id} className="overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] shadow-xl">
                        <div className="relative h-48 bg-[#090f1e]">
                          <img src={blog.image} alt={blog.title} className="h-full w-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#090f1e] via-transparent to-transparent" />
                          <span className="absolute right-4 top-4 rounded-full bg-[#d4af37] px-2.5 py-1 text-[10px] font-black text-black">
                            #{blog.orderIndex}
                          </span>
                          {blog.videoUrl ? (
                            <span className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white">
                              Video linked
                            </span>
                          ) : null}
                        </div>
                        <div className="p-5">
                          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#d4af37]">Blog</p>
                          <h2 className="mt-2 text-xl font-black uppercase text-white">{blog.title}</h2>
                          <p className="mt-3 min-h-16 text-sm leading-6 text-white/55">{blog.description}</p>
                          {blog.videoUrl ? (
                            <a href={blog.videoUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-xs font-black uppercase tracking-wider text-[#d4af37]">
                              Open video
                            </a>
                          ) : null}
                          <div className="mt-5 flex items-center justify-end gap-2 border-t border-white/5 pt-4">
                            <button
                              type="button"
                              onClick={() => openEditBlogModal(blog)}
                              className="p-2 border border-white/10 hover:border-[#d4af37]/30 bg-[#d4af37]/5 hover:bg-[#d4af37]/10 rounded-lg text-[#d4af37] transition-all cursor-pointer"
                              title="Edit blog"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteBlog(blog.id)}
                              className="p-2 border border-white/5 hover:border-red-500/20 bg-red-500/5 hover:bg-red-500/10 rounded-lg text-red-400/70 hover:text-red-400 transition-all cursor-pointer"
                              title="Delete blog"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className="col-span-full rounded-xl border border-white/5 bg-white/[0.01] p-12 text-center text-white/35">
                      {blogsLoading ? "Loading blogs..." : "No blogs found. Add the first blog to show it on Meet Experts page."}
                    </div>
                  )}
                </div>
              </div>
            ) : activeTab === "settings" ? (
              // --- SETTINGS VIEW ---
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-black uppercase tracking-wide flex items-center gap-3">
                    Admin Settings
                    <ShieldAlert className="text-[#d4af37]" size={22} />
                  </h1>
                  <p className="mt-1 text-sm text-white/50">
                    Manage admin portal access credentials for this browser-based admin session.
                  </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="border border-white/5 bg-white/[0.01] rounded-xl p-6">
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#d4af37]/10 text-[#d4af37]">
                        <Lock size={20} />
                      </div>
                      <div>
                        <h2 className="text-lg font-black uppercase">Password Security</h2>
                        <p className="text-xs text-white/45">Default password can be replaced here.</p>
                      </div>
                    </div>

                    <div className="mt-6 rounded-xl border border-white/5 bg-black/20 p-4 text-xs leading-6 text-white/55">
                      <p>
                        Admin email remains <span className="font-mono text-[#d4af37]">admin@gemca.com.au</span>.
                      </p>
                      <p className="mt-2">
                        After changing the password, logout and use the new password for future admin login.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handlePasswordUpdate} className="border border-white/5 bg-white/[0.01] rounded-xl p-6 space-y-5">
                    {settingsError && (
                      <div className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
                        <AlertTriangle className="mt-0.5 shrink-0 text-red-400" size={18} />
                        <p>{settingsError}</p>
                      </div>
                    )}

                    {settingsMessage && (
                      <div className="flex items-start gap-3 rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-200">
                        <CheckCircle className="mt-0.5 shrink-0 text-green-400" size={18} />
                        <p>{settingsMessage}</p>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-[0.18em] text-white/50">
                        Current Password
                      </label>
                      <input
                        type="password"
                        required
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm((current) => ({ ...current, currentPassword: e.target.value }))}
                        className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-[0.18em] text-white/50">
                          New Password
                        </label>
                        <input
                          type="password"
                          required
                          minLength={8}
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm((current) => ({ ...current, newPassword: e.target.value }))}
                          className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-[0.18em] text-white/50">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          required
                          minLength={8}
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm((current) => ({ ...current, confirmPassword: e.target.value }))}
                          className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end border-t border-white/5 pt-5">
                      <button
                        type="submit"
                        className="flex items-center gap-2 bg-[#d4af37] hover:bg-[#bfa032] text-black font-black uppercase tracking-wider text-xs px-6 py-3 rounded-lg transition-colors cursor-pointer"
                      >
                        <Save size={15} />
                        Set New Password
                      </button>
                    </div>
                  </form>
                </div>

                <form onSubmit={handleTermsUpdate} className="border border-white/5 bg-white/[0.01] rounded-xl p-6 space-y-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-lg font-black uppercase">Terms & Conditions Page</h2>
                      <p className="mt-1 text-xs text-white/45">
                        Content saved here appears on <span className="font-mono text-[#d4af37]">/terms-and-conditions</span>.
                      </p>
                    </div>
                    <a
                      href="/terms-and-conditions"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-xs font-black uppercase tracking-wider text-white/70 transition hover:border-[#d4af37] hover:text-[#d4af37]"
                    >
                      <Eye size={14} />
                      Preview
                    </a>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.18em] text-white/50">
                      Page Title
                    </label>
                    <input
                      required
                      value={termsForm.title}
                      onChange={(e) => setTermsForm((current) => ({ ...current, title: e.target.value }))}
                      className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.18em] text-white/50">
                      Page Content
                    </label>
                    <textarea
                      required
                      rows={18}
                      value={termsForm.content}
                      onChange={(e) => setTermsForm((current) => ({ ...current, content: e.target.value }))}
                      className="w-full resize-y rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 font-mono text-sm leading-7 text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none"
                    />
                    <p className="text-[11px] font-semibold normal-case leading-6 text-white/40">
                      Use headings like <span className="font-mono text-[#d4af37]">## Refunds</span>. Blank lines create new paragraphs.
                    </p>
                  </div>

                  <div className="flex justify-end border-t border-white/5 pt-5">
                    <button
                      type="submit"
                      disabled={termsLoading}
                      className="flex items-center gap-2 bg-[#d4af37] hover:bg-[#bfa032] disabled:opacity-40 disabled:cursor-not-allowed text-black font-black uppercase tracking-wider text-xs px-6 py-3 rounded-lg transition-colors cursor-pointer"
                    >
                      <Save size={15} />
                      {termsLoading ? "Saving..." : "Save Terms Page"}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              // --- ORIGINAL LEADS VIEW ---
              <>
                {/* Dashboard Summary Title & Quick Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-black uppercase tracking-wide flex items-center gap-3">
                      Leads & Visa Pipeline
                      {dbLoading && (
                        <RefreshCw className="animate-spin text-[#d4af37]" size={20} />
                      )}
                    </h1>
                    <p className="text-sm text-white/50 flex items-center gap-1.5">
                      <Database size={14} className="text-[#d4af37]" />
                      Persistent Table: <span className="font-mono text-xs text-[#d4af37] bg-white/[0.02] border border-white/5 px-2 py-0.5 rounded">gemca_db.leads</span>
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={handleAddMockLead}
                      disabled={!!dbError}
                      className="flex items-center gap-2 bg-[#d4af37] hover:bg-[#bfa032] disabled:opacity-40 disabled:cursor-not-allowed text-black font-black uppercase tracking-wider text-xs px-4 py-3 rounded-lg transition-colors cursor-pointer shrink-0"
                    >
                      <Plus size={16} />
                      Add MySQL Lead
                    </button>
                    
                    <button 
                      onClick={() => alert("CSV Export initialized: Downloading SQL client records...")}
                      className="flex items-center gap-2 border border-white/10 hover:border-[#d4af37] bg-white/[0.02] hover:bg-white/[0.05] text-white font-bold uppercase tracking-wider text-xs px-4 py-3 rounded-lg transition-all cursor-pointer shrink-0"
                    >
                      <FileSpreadsheet size={16} className="text-[#d4af37]" />
                      Export CSV
                    </button>
                  </div>
                </div>

                {/* Metric Block KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  
                  {/* Total Leads */}
                  <div className="border border-white/5 bg-white/[0.01] rounded-xl p-5 hover:border-white/10 transition-colors relative overflow-hidden group">
                    <div className="absolute right-0 bottom-0 translate-x-3 translate-y-3 opacity-[0.02] group-hover:scale-110 transition-transform">
                      <Users size={120} />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black uppercase tracking-widest text-white/50">Total Inquiries</span>
                      <div className="p-2 rounded-lg bg-[#2e5fa3]/10 text-[#6ea3ec]">
                        <Users size={18} />
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black">{totalLeads}</span>
                      <span className="text-[11px] font-bold text-green-400 flex items-center gap-0.5">
                        <TrendingUp size={12} />
                        +12%
                      </span>
                    </div>
                    <p className="text-xs text-white/40 mt-2">Active client inquiries</p>
                  </div>

                  {/* New Inquiries */}
                  <div className="border border-white/5 bg-white/[0.01] rounded-xl p-5 hover:border-white/10 transition-colors relative overflow-hidden group">
                    <div className="absolute right-0 bottom-0 translate-x-3 translate-y-3 opacity-[0.02] group-hover:scale-110 transition-transform">
                      <FileText size={120} />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black uppercase tracking-widest text-white/50">Unprocessed</span>
                      <div className="p-2 rounded-lg bg-[#d4af37]/10 text-[#d4af37]">
                        <FileText size={18} />
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-[#d4af37]">{newLeads}</span>
                      <span className="text-[11px] font-bold text-[#d4af37] px-1.5 py-0.5 bg-[#d4af37]/10 rounded">
                        Needs Review
                      </span>
                    </div>
                    <p className="text-xs text-white/40 mt-2">Awaiting initial profile check</p>
                  </div>

                  {/* In Progress / Active */}
                  <div className="border border-white/5 bg-white/[0.01] rounded-xl p-5 hover:border-white/10 transition-colors relative overflow-hidden group">
                    <div className="absolute right-0 bottom-0 translate-x-3 translate-y-3 opacity-[0.02] group-hover:scale-110 transition-transform">
                      <PhoneCall size={120} />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black uppercase tracking-widest text-white/50">In Progress</span>
                      <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
                        <PhoneCall size={18} />
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-orange-400">{inProgressLeads}</span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full mt-4 overflow-hidden">
                      <div 
                        className="bg-orange-400 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${totalLeads ? (inProgressLeads / totalLeads) * 100 : 0}%` }}
                      />
                    </div>
                  </div>

                  {/* Critical Action Required */}
                  <div className="border border-white/5 bg-white/[0.01] rounded-xl p-5 hover:border-white/10 transition-colors relative overflow-hidden group">
                    <div className="absolute right-0 bottom-0 translate-x-3 translate-y-3 opacity-[0.02] group-hover:scale-110 transition-transform">
                      <AlertTriangle size={120} />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black uppercase tracking-widest text-white/50">Action Needed</span>
                      <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
                        <AlertTriangle size={18} />
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-red-400">{actionRequiredLeads}</span>
                      {actionRequiredLeads > 0 && (
                        <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                      )}
                    </div>
                    <p className="text-xs text-white/40 mt-2">Critical client files pending response</p>
                  </div>

                </div>

                {/* Search, Filter Tabs and Table Container */}
                <div className="border border-white/5 bg-white/[0.01] rounded-xl overflow-hidden shadow-xl">
                  
                  {/* Search and Filters Header */}
                  <div className="p-5 border-b border-white/5 bg-white/[0.01] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    
                    {/* Filter Tabs */}
                    <div className="flex flex-wrap gap-1">
                      {["All", "New", "In Progress", "Approved", "Action Required"].map((status) => {
                        const isActive = selectedStatus === status;
                        return (
                          <button
                            key={status}
                            onClick={() => setSelectedStatus(status)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                              isActive 
                                ? "bg-white/10 text-white border border-white/10" 
                                : "text-white/55 hover:text-white hover:bg-white/[0.02] border border-transparent"
                            }`}
                          >
                            {status}
                            <span className="ml-2 text-[10px] opacity-60">
                              {status === "All" && totalLeads}
                              {status === "New" && newLeads}
                              {status === "In Progress" && inProgressLeads}
                              {status === "Approved" && approvedLeads}
                              {status === "Action Required" && actionRequiredLeads}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Search Box */}
                    <div className="relative w-full lg:w-80">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                      <input
                        type="text"
                        placeholder="Search client, visa, subclass..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-lg border border-white/5 bg-white/[0.03] pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/30 transition-all focus:border-[#d4af37] focus:bg-white/[0.06] focus:outline-none"
                      />
                      {searchQuery && (
                        <button 
                          onClick={() => setSearchQuery("")}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Table Area */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border-spacing-0">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/[0.005] text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                          <th className="py-4 px-6">Client Name</th>
                          <th className="py-4 px-6">Visa Pathway</th>
                          <th className="py-4 px-6">Date Added</th>
                          <th className="py-4 px-6">Status</th>
                          <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-sm font-semibold">
                        {filteredLeads.length > 0 ? (
                          filteredLeads.map((lead) => {
                            // Status Badge Styles
                            let badgeStyle = "bg-white/10 text-white/80";
                            if (lead.status === "New") badgeStyle = "bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/20";
                            if (lead.status === "In Progress") badgeStyle = "bg-orange-500/10 text-orange-400 border border-orange-500/15";
                            if (lead.status === "Approved") badgeStyle = "bg-green-500/10 text-green-400 border border-green-500/15";
                            if (lead.status === "Action Required") badgeStyle = "bg-red-500/10 text-red-400 border border-red-500/15";

                            return (
                              <tr 
                                key={lead.id}
                                onClick={() => setActiveLead(lead)}
                                className="hover:bg-white/[0.015] transition-colors cursor-pointer group"
                              >
                                {/* Client Info */}
                                <td className="py-4 px-6">
                                  <p className="font-bold text-white group-hover:text-[#d4af37] transition-colors">{lead.name}</p>
                                  <p className="text-xs text-white/40 font-mono mt-0.5">{lead.email}</p>
                                </td>

                                {/* Pathway */}
                                <td className="py-4 px-6 text-white/80">
                                  {lead.pathway}
                                </td>

                                {/* Date */}
                                <td className="py-4 px-6 text-xs text-white/55 font-mono">
                                  <span className="flex items-center gap-1.5">
                                    <Calendar size={13} className="text-white/30" />
                                    {lead.date}
                                  </span>
                                </td>

                                {/* Status Badge */}
                                <td className="py-4 px-6">
                                  <span className={`inline-flex px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${badgeStyle}`}>
                                    {lead.status}
                                  </span>
                                </td>

                                {/* Action Items */}
                                <td className="py-4 px-6 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    
                                    {/* Quick status change dropdown */}
                                    <select 
                                      value={lead.status}
                                      onClick={(e) => e.stopPropagation()}
                                      onChange={(e) => handleUpdateStatus(lead.id, e.target.value as Lead["status"], e)}
                                      className="bg-[#090e1b] border border-white/10 rounded px-2 py-1 text-xs text-white/70 focus:outline-none focus:border-[#d4af37] cursor-pointer"
                                    >
                                      <option value="New">New</option>
                                      <option value="In Progress">In Progress</option>
                                      <option value="Approved">Approved</option>
                                      <option value="Action Required">Action Required</option>
                                    </select>

                                    {/* View Details */}
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveLead(lead);
                                      }}
                                      className="p-2 border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] rounded-lg text-white/70 hover:text-white transition-all cursor-pointer"
                                      title="View Details"
                                    >
                                      <Eye size={14} />
                                    </button>

                                    {/* Delete */}
                                    <button 
                                      onClick={(e) => handleDeleteLead(lead.id, e)}
                                      className="p-2 border border-white/5 hover:border-red-500/20 bg-red-500/5 hover:bg-red-500/10 rounded-lg text-red-400/70 hover:text-red-400 transition-all cursor-pointer"
                                      title="Delete Inquiry"
                                    >
                                      <Trash2 size={14} />
                                    </button>

                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan={5} className="py-12 text-center text-white/30">
                              {dbLoading ? "Accessing SQL Database..." : "No client logs found matching current filters."}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Footer summary */}
                  <div className="p-4 border-t border-white/5 bg-white/[0.005] text-xs text-white/40 flex items-center justify-between">
                    <span>Showing {filteredLeads.length} of {totalLeads} entries</span>
                    <span className="flex items-center gap-1 font-bold">
                      <Database size={11} className="text-[#d4af37]" /> Connected: MySQL
                    </span>
                  </div>
                </div>
              </>
            )}
          </main>
        </div>

        {/* Lead Viewer Modal */}
        {activeLead && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999] animate-fade-in">
            <div className="bg-[#090f1e] border border-white/10 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative">
              
              {/* Decorative top bar */}
              <div className="h-1 bg-gradient-to-r from-[#d4af37] via-[#2e5fa3] to-transparent" />

              {/* Modal Header */}
              <div className="p-6 border-b border-white/5 flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37] block mb-1">
                    Client Case Profile
                  </span>
                  <h2 className="text-2xl font-black uppercase text-white">{activeLead.name}</h2>
                  <p className="text-xs text-white/40 font-mono mt-0.5">ID: {activeLead.id}</p>
                </div>
                
                <button 
                  onClick={() => setActiveLead(null)}
                  className="p-1.5 border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.06] rounded-lg text-white/50 hover:text-white transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                
                {/* Contact and Pathway detail */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border border-white/5 bg-white/[0.01] p-4 rounded-xl">
                    <p className="text-[10px] font-black uppercase tracking-wider text-white/40">Contact Information</p>
                    <p className="text-sm font-bold text-white mt-1">{activeLead.phone}</p>
                    <p className="text-xs text-white/60 font-mono mt-0.5">{activeLead.email}</p>
                  </div>
                  <div className="border border-white/5 bg-white/[0.01] p-4 rounded-xl">
                    <p className="text-[10px] font-black uppercase tracking-wider text-white/40">Visa Pathway Strategy</p>
                    <p className="text-sm font-bold text-[#d4af37] mt-1">{activeLead.pathway}</p>
                    <p className="text-xs text-white/40 font-mono mt-0.5">Subclass Eligible</p>
                  </div>
                </div>

                {/* Status selector inside details */}
                <div className="border border-white/5 bg-white/[0.01] p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-white/40">Current Status</p>
                    <p className="text-xs text-white/60 mt-0.5">Updating here writes directly to the MySQL database.</p>
                  </div>
                  <select 
                    value={activeLead.status}
                    onChange={(e) => handleUpdateStatus(activeLead.id, e.target.value as Lead["status"])}
                    className="bg-[#070b12] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37] cursor-pointer font-bold"
                  >
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Approved">Approved</option>
                    <option value="Action Required">Action Required</option>
                  </select>
                </div>

                {/* Message / Consultation Notes */}
                <div className="space-y-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-white/40">Client Consultation Notes</h3>
                  <div className="bg-[#070b12] border border-white/5 p-4 rounded-xl text-sm leading-6 text-white/80 whitespace-pre-wrap">
                    {activeLead.notes}
                  </div>
                </div>

                {/* Mock Documents Checklist */}
                <div className="space-y-3">
                  <h3 className="text-xs font-black uppercase tracking-wider text-white/40">Uploaded Documents Checklist</h3>
                  <div className="grid gap-2 text-xs font-bold">
                    <div className="flex items-center justify-between p-3 border border-white/5 bg-white/[0.01] rounded-lg">
                      <span className="text-white/70">Passport Bio-page (Verified)</span>
                      <span className="text-green-400 flex items-center gap-1">
                        <CheckCircle size={14} /> Completed
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-white/5 bg-white/[0.01] rounded-lg">
                      <span className="text-white/70">Academic Transcripts & COE</span>
                      {activeLead.pathway.includes("Student") ? (
                        <span className="text-green-400 flex items-center gap-1">
                          <CheckCircle size={14} /> Completed
                        </span>
                      ) : (
                        <span className="text-white/30">N/A</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between p-3 border border-white/5 bg-white/[0.01] rounded-lg">
                      <span className="text-white/70">Skills Assessment Letter</span>
                      {activeLead.pathway.includes("Skilled") ? (
                        activeLead.status === "Action Required" ? (
                          <span className="text-[#d4af37] flex items-center gap-1">
                            <AlertTriangle size={14} /> Review Needed
                          </span>
                        ) : (
                          <span className="text-green-400 flex items-center gap-1">
                            <CheckCircle size={14} /> Completed
                          </span>
                        )
                      ) : (
                        <span className="text-white/30">N/A</span>
                      )}
                    </div>
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-white/5 bg-white/[0.005] flex items-center justify-end gap-3">
                <button 
                  onClick={() => {
                    alert("Consultation files synchronized with SQL Server successfully.");
                    setActiveLead(null);
                  }}
                  className="bg-[#d4af37] hover:bg-[#bfa032] text-black font-black uppercase tracking-wider text-xs px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Save and Sync
                </button>
                <button 
                  onClick={() => setActiveLead(null)}
                  className="border border-white/10 hover:bg-white/5 text-white/80 font-bold uppercase tracking-wider text-xs px-4 py-2.5 rounded-lg transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Add/Edit Inquiry Modal */}
        {isInquiryModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 z-[9999] overflow-y-auto">
            <div className="bg-[#090f1e] border border-white/10 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative my-8">
              <div className="h-1 bg-gradient-to-r from-[#d4af37] via-[#2e5fa3] to-transparent" />

              <div className="p-6 border-b border-white/5 flex items-center justify-between text-left">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37] block mb-1">
                    Inquiry CRUD
                  </span>
                  <h2 className="text-xl font-black uppercase text-white">
                    {editingInquiryId ? "Edit Inquiry" : "Add Inquiry"}
                  </h2>
                </div>
                <button
                  onClick={closeInquiryModal}
                  className="p-1.5 border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.06] rounded-lg text-white/50 hover:text-white transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveInquiry} className="p-6 space-y-4 text-xs font-bold uppercase tracking-wider">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-white/50 text-[10px] block">Full Name <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      required
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm((current) => ({ ...current, name: e.target.value }))}
                      className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-white/50 text-[10px] block">Phone <span className="text-red-400">*</span></label>
                    <input
                      type="tel"
                      required
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm((current) => ({ ...current, phone: e.target.value }))}
                      className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-white/50 text-[10px] block">Email <span className="text-red-400">*</span></label>
                    <input
                      type="email"
                      required
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm((current) => ({ ...current, email: e.target.value }))}
                      className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-white/50 text-[10px] block">Location</label>
                    <input
                      type="text"
                      value={inquiryForm.location}
                      onChange={(e) => setInquiryForm((current) => ({ ...current, location: e.target.value }))}
                      className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-white/50 text-[10px] block">Service <span className="text-red-400">*</span></label>
                    <select
                      value={inquiryForm.pathway}
                      onChange={(e) => setInquiryForm((current) => ({ ...current, pathway: e.target.value }))}
                      className="w-full rounded-lg border border-white/5 bg-[#090f1e] px-4 py-3 text-white focus:border-[#d4af37] focus:outline-none cursor-pointer"
                    >
                      <option value="Study in Australia Consultation">Study in Australia</option>
                      <option value="Skilled Migration Consultation">Skilled Migration</option>
                      <option value="Employer Sponsored Visa Consultation">Employer Sponsored Visa</option>
                      <option value="Partner or Family Visa Consultation">Partner / Family Visa</option>
                      <option value="Visitor Visa Consultation">Visitor Visa</option>
                      <option value="General Migration Consultation">General Consultation</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-white/50 text-[10px] block">Status</label>
                    <select
                      value={inquiryForm.status}
                      onChange={(e) => setInquiryForm((current) => ({ ...current, status: e.target.value as Lead["status"] }))}
                      className="w-full rounded-lg border border-white/5 bg-[#090f1e] px-4 py-3 text-white focus:border-[#d4af37] focus:outline-none cursor-pointer"
                    >
                      <option value="New">New</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Approved">Approved</option>
                      <option value="Action Required">Action Required</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-white/50 text-[10px] block">Preferred Time</label>
                  <input
                    type="text"
                    value={inquiryForm.preferredTime}
                    onChange={(e) => setInquiryForm((current) => ({ ...current, preferredTime: e.target.value }))}
                    className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-white/50 text-[10px] block">Inquiry Detail <span className="text-red-400">*</span></label>
                  <textarea
                    required
                    rows={5}
                    value={inquiryForm.message}
                    onChange={(e) => setInquiryForm((current) => ({ ...current, message: e.target.value }))}
                    className="w-full resize-none rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none normal-case leading-6"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/5">
                  <button
                    type="button"
                    onClick={closeInquiryModal}
                    className="border border-white/10 hover:bg-white/5 px-5 py-2.5 rounded-lg text-white/80 font-bold uppercase transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={dbLoading}
                    className="bg-[#d4af37] hover:bg-[#bfa032] disabled:opacity-40 disabled:cursor-not-allowed text-black font-black uppercase px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    {editingInquiryId ? "Update Inquiry" : "Create Inquiry"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add/Edit Expert Modal */}
        {isExpertModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 z-[9999] overflow-y-auto">
            <div className="bg-[#090f1e] border border-white/10 w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl relative my-8">
              <div className="h-1 bg-gradient-to-r from-[#d4af37] via-[#2e5fa3] to-transparent" />

              <div className="p-6 border-b border-white/5 flex items-center justify-between text-left">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37] block mb-1">
                    Expert CRUD
                  </span>
                  <h2 className="text-xl font-black uppercase text-white">
                    {editingExpertId ? "Edit Expert" : "Add Expert"}
                  </h2>
                </div>
                <button
                  onClick={closeExpertModal}
                  className="p-1.5 border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.06] rounded-lg text-white/50 hover:text-white transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveExpert} className="p-6 space-y-4 text-xs font-bold uppercase tracking-wider">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-white/50 text-[10px] block">Expert Name <span className="text-red-400">*</span></label>
                    <input
                      required
                      value={expertForm.name}
                      onChange={(e) => setExpertForm((current) => ({ ...current, name: e.target.value }))}
                      className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-white/50 text-[10px] block">Role <span className="text-red-400">*</span></label>
                    <input
                      required
                      value={expertForm.role}
                      onChange={(e) => setExpertForm((current) => ({ ...current, role: e.target.value }))}
                      className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-[1fr_0.45fr_0.35fr] gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-white/50 text-[10px] block">Expert Image</label>
                    <div className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.03] p-3">
                      <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black/20">
                        <img src={expertForm.image || "/testimonial-consultation.png"} alt="Expert preview" className="h-full w-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setExpertImageFile(e.target.files?.[0] || null)}
                          className="w-full cursor-pointer rounded-lg border border-white/5 bg-[#090f1e] px-3 py-2 text-xs text-white/70 file:mr-3 file:rounded-md file:border-0 file:bg-[#d4af37] file:px-3 file:py-1.5 file:text-xs file:font-black file:uppercase file:text-black"
                        />
                        <p className="mt-2 truncate text-[10px] font-bold normal-case text-white/35">
                          {expertImageFile ? expertImageFile.name : `Current: ${expertForm.image}`}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-white/50 text-[10px] block">Experience <span className="text-red-400">*</span></label>
                    <input
                      required
                      value={expertForm.experience}
                      placeholder="5+ years"
                      onChange={(e) => setExpertForm((current) => ({ ...current, experience: e.target.value }))}
                      className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none normal-case"
                    />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-white/50 text-[10px] block">Order</label>
                    <input
                      type="number"
                      min={1}
                      value={expertForm.orderIndex}
                      onChange={(e) => setExpertForm((current) => ({ ...current, orderIndex: Number(e.target.value) }))}
                      className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-white/50 text-[10px] block">Specialties <span className="text-red-400">*</span></label>
                    <textarea
                      required
                      rows={3}
                      value={expertForm.specialties}
                      placeholder="Skilled Migration, Student Visa, PR Strategy"
                      onChange={(e) => setExpertForm((current) => ({ ...current, specialties: e.target.value }))}
                      className="w-full resize-none rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none normal-case leading-6"
                    />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-white/50 text-[10px] block">Qualifications <span className="text-red-400">*</span></label>
                    <textarea
                      required
                      rows={3}
                      value={expertForm.qualifications}
                      placeholder="LLB, Master of Migration Law"
                      onChange={(e) => setExpertForm((current) => ({ ...current, qualifications: e.target.value }))}
                      className="w-full resize-none rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none normal-case leading-6"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-[1fr_0.55fr] gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-white/50 text-[10px] block">Languages <span className="text-red-400">*</span></label>
                    <input
                      required
                      value={expertForm.languages}
                      placeholder="English, Hindi, Punjabi"
                      onChange={(e) => setExpertForm((current) => ({ ...current, languages: e.target.value }))}
                      className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none normal-case"
                    />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-white/50 text-[10px] block">Profile Stat <span className="text-red-400">*</span></label>
                    <input
                      required
                      value={expertForm.stat}
                      placeholder="500+"
                      onChange={(e) => setExpertForm((current) => ({ ...current, stat: e.target.value }))}
                      className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none normal-case"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-white/50 text-[10px] block">Achievement / Card Text <span className="text-red-400">*</span></label>
                  <textarea
                    required
                    rows={4}
                    value={expertForm.achievement}
                    onChange={(e) => setExpertForm((current) => ({ ...current, achievement: e.target.value }))}
                    className="w-full resize-none rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none normal-case leading-6"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/5">
                  <button
                    type="button"
                    onClick={closeExpertModal}
                    className="border border-white/10 hover:bg-white/5 px-5 py-2.5 rounded-lg text-white/80 font-bold uppercase transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={expertsLoading}
                    className="bg-[#d4af37] hover:bg-[#bfa032] disabled:opacity-40 disabled:cursor-not-allowed text-black font-black uppercase px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    {editingExpertId ? "Update Expert" : "Create Expert"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add/Edit Blog Modal */}
        {isBlogModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 z-[9999] overflow-y-auto">
            <div className="bg-[#090f1e] border border-white/10 w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl relative my-8">
              <div className="h-1 bg-gradient-to-r from-[#d4af37] via-[#2e5fa3] to-transparent" />

              <div className="p-6 border-b border-white/5 flex items-center justify-between text-left">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37] block mb-1">
                    Blog CRUD
                  </span>
                  <h2 className="text-xl font-black uppercase text-white">
                    {editingBlogId ? "Edit Blog" : "Add Blog"}
                  </h2>
                </div>
                <button
                  onClick={closeBlogModal}
                  className="p-1.5 border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.06] rounded-lg text-white/50 hover:text-white transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveBlog} className="p-6 space-y-4 text-xs font-bold uppercase tracking-wider">
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_0.28fr] gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-white/50 text-[10px] block">Blog Title <span className="text-red-400">*</span></label>
                    <input
                      required
                      value={blogForm.title}
                      onChange={(e) => setBlogForm((current) => ({ ...current, title: e.target.value }))}
                      className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-white/50 text-[10px] block">Order</label>
                    <input
                      type="number"
                      min={1}
                      value={blogForm.orderIndex}
                      onChange={(e) => setBlogForm((current) => ({ ...current, orderIndex: Number(e.target.value) }))}
                      className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-white/50 text-[10px] block">Description <span className="text-red-400">*</span></label>
                  <textarea
                    required
                    rows={4}
                    value={blogForm.description}
                    onChange={(e) => setBlogForm((current) => ({ ...current, description: e.target.value }))}
                    className="w-full resize-none rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none normal-case leading-6"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-white/50 text-[10px] block">Blog Image</label>
                  <div className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.03] p-3">
                    <div className="h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black/20">
                      <img src={blogForm.image || "/testimonial-consultation.png"} alt="Blog preview" className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setBlogImageFile(e.target.files?.[0] || null)}
                        className="w-full cursor-pointer rounded-lg border border-white/5 bg-[#090f1e] px-3 py-2 text-xs text-white/70 file:mr-3 file:rounded-md file:border-0 file:bg-[#d4af37] file:px-3 file:py-1.5 file:text-xs file:font-black file:uppercase file:text-black"
                      />
                      <p className="mt-2 truncate text-[10px] font-bold normal-case text-white/35">
                        {blogImageFile ? blogImageFile.name : `Current: ${blogForm.image}`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-white/50 text-[10px] block">Video URL</label>
                  <input
                    value={blogForm.videoUrl}
                    placeholder="https://youtube.com/..."
                    onChange={(e) => setBlogForm((current) => ({ ...current, videoUrl: e.target.value }))}
                    className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none normal-case"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/5">
                  <button
                    type="button"
                    onClick={closeBlogModal}
                    className="border border-white/10 hover:bg-white/5 px-5 py-2.5 rounded-lg text-white/80 font-bold uppercase transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={blogsLoading}
                    className="bg-[#d4af37] hover:bg-[#bfa032] disabled:opacity-40 disabled:cursor-not-allowed text-black font-black uppercase px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    {editingBlogId ? "Update Blog" : "Create Blog"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Visa Modal */}
        {isAddVisaModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 z-[9999] overflow-y-auto">
            <div className="bg-[#090f1e] border border-white/10 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl relative my-8">
              <div className="h-1 bg-gradient-to-r from-[#d4af37] via-[#2e5fa3] to-transparent" />
              
              <div className="p-6 border-b border-white/5 flex items-center justify-between text-left">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37] block mb-1">
                    System Database
                  </span>
                  <h2 className="text-xl font-black uppercase text-white">Create Visa Subclass</h2>
                </div>
                <button 
                  onClick={() => setIsAddVisaModalOpen(false)}
                  className="p-1.5 border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.06] rounded-lg text-white/50 hover:text-white transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleCreateVisa} className="p-6 space-y-4 text-xs font-bold uppercase tracking-wider">
                {/* Visa Name */}
                <div className="space-y-1.5 text-left">
                  <label className="text-white/50 text-[10px] block">Visa Name <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Partner (Provisional) Visa"
                    value={newVisaName}
                    onChange={(e) => {
                      setNewVisaName(e.target.value);
                      // Auto slugify
                      setNewVisaSlug(
                        e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/(^-|-$)/g, "")
                      );
                    }}
                    className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none"
                  />
                </div>

                {/* Subclass */}
                <div className="space-y-1.5 text-left">
                  <label className="text-white/50 text-[10px] block">Subclass Number <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 309"
                    value={newVisaSubclass}
                    onChange={(e) => setNewVisaSubclass(e.target.value)}
                    className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none"
                  />
                </div>

                {/* Category dropdown */}
                <div className="space-y-1.5 text-left">
                  <label className="text-white/50 text-[10px] block">Category Group <span className="text-red-400">*</span></label>
                  <select
                    value={newVisaCategoryId}
                    onChange={(e) => setNewVisaCategoryId(e.target.value)}
                    className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-white focus:border-[#d4af37] focus:outline-none cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id} className="bg-[#090f1e] text-white">
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div className="space-y-1.5 text-left">
                  <label className="text-white/50 text-[10px] block">Status</label>
                  <select
                    value={newVisaStatus}
                    onChange={(e) => setNewVisaStatus(e.target.value)}
                    className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-white focus:border-[#d4af37] focus:outline-none cursor-pointer"
                  >
                    <option value="Published" className="bg-[#090f1e] text-white">Current (Published)</option>
                    <option value="Draft" className="bg-[#090f1e] text-white">Draft</option>
                    <option value="Archived" className="bg-[#090f1e] text-white">Archived</option>
                  </select>
                </div>

                {/* Slug */}
                <div className="space-y-1.5 text-left">
                  <label className="text-white/50 text-[10px] block">URL Slug <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. subclass-309-partner-visa"
                    value={newVisaSlug}
                    onChange={(e) => setNewVisaSlug(e.target.value)}
                    className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none font-mono"
                  />
                </div>

                {/* Featured Image */}
                <div className="space-y-1.5 text-left">
                  <label className="text-white/50 text-[10px] block">Featured Image URL</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/... or paste link"
                    value={newVisaFeaturedImage}
                    onChange={(e) => setNewVisaFeaturedImage(e.target.value)}
                    className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none font-mono text-[10px] normal-case"
                  />
                  <div className="flex gap-2 mt-1">
                    <button 
                      type="button" 
                      onClick={() => setNewVisaFeaturedImage("https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?q=80&w=800")}
                      className="bg-white/5 hover:bg-white/10 px-2 py-1 rounded text-[9px] text-white/70 cursor-pointer"
                    >
                      Preset: Partner
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setNewVisaFeaturedImage("https://images.unsplash.com/photo-1523482596112-c90940cc68e1?q=80&w=800")}
                      className="bg-white/5 hover:bg-white/10 px-2 py-1 rounded text-[9px] text-white/70 cursor-pointer"
                    >
                      Preset: Opera House
                    </button>
                  </div>
                </div>

                {/* Hero Banner */}
                <div className="space-y-1.5 text-left">
                  <label className="text-white/50 text-[10px] block">Hero Banner Image URL</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/... or paste link"
                    value={newVisaHeroBanner}
                    onChange={(e) => setNewVisaHeroBanner(e.target.value)}
                    className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none font-mono text-[10px] normal-case"
                  />
                  <div className="flex gap-2 mt-1">
                    <button 
                      type="button" 
                      onClick={() => setNewVisaHeroBanner("https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200")}
                      className="bg-white/5 hover:bg-white/10 px-2 py-1 rounded text-[9px] text-white/70 cursor-pointer"
                    >
                      Preset: Harbour Bridge
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setNewVisaHeroBanner("https://images.unsplash.com/photo-1490761902450-a1f6a15d8f7f?q=80&w=1200")}
                      className="bg-white/5 hover:bg-white/10 px-2 py-1 rounded text-[9px] text-white/70 cursor-pointer"
                    >
                      Preset: Melbourne
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/5">
                  <button 
                    type="button" 
                    onClick={() => setIsAddVisaModalOpen(false)}
                    className="border border-white/10 hover:bg-white/5 px-5 py-2.5 rounded-lg text-white/80 font-bold uppercase transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={visasLoading}
                    className="bg-[#d4af37] hover:bg-[#bfa032] disabled:opacity-40 disabled:cursor-not-allowed text-black font-black uppercase px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Publish Subclass
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </AdminGuard>
  );
}
