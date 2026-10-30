import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ChevronDown, Menu, X, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

const siteConfig = {
  name: 'Studio Name',
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://www.example.com',
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL || 'hello@yourstudio.co.uk',
  contactPhone: import.meta.env.VITE_CONTACT_PHONE || '+44 (0)20 0000 0000',
  formEndpoint: import.meta.env.VITE_CONTACT_FORM_ENDPOINT || '',
};

const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'Architecture', href: '#services' },
  { label: 'Interiors', href: '#services' },
  { label: 'Our Work', href: '#projects' },
  { label: 'Studio', href: '#philosophy' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  {
    title: 'Residential Architecture',
    description: 'Thoughtful home design shaped around lifestyle, context and enduring materials.',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
    href: '#contact',
  },
  {
    title: 'Interior Architecture & Interior Design',
    description: 'Layered schemes that balance proportion, texture, light and everyday ease.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    href: '#contact',
  },
  {
    title: 'Home Extensions & Renovations',
    description: 'Sensitive transformations that extend the value and character of London homes.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80',
    href: '#contact',
  },
  {
    title: 'Space Planning & Technical Design',
    description: 'Clear, efficient planning with attention to circulation, function and buildability.',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80',
    href: '#contact',
  },
  {
    title: 'Bespoke Kitchens & Joinery',
    description: 'Crafted interiors with custom detailing, natural finishes and considered storage.',
    image: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=900&q=80',
    href: '#contact',
  },
  {
    title: 'Commercial & Hospitality Interiors',
    description: 'Hybrid environments designed to feel welcoming, elevated and commercially effective.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
    href: '#contact',
  },
];

const projects = [
  {
    title: 'Contemporary London Residence',
    category: 'Architecture',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    description: 'Concept study for a light-filled family home with layered living spaces and refined detailing.',
  },
  {
    title: 'Chelsea Townhouse',
    category: 'Interiors',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    description: 'A warm, elegant townhouse interior shaped around calm palette, natural stone and tailored joinery.',
  },
  {
    title: 'Kensington Apartment',
    category: 'Interiors',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    description: 'An editorial apartment concept blending contemporary materials with quiet luxury.',
  },
  {
    title: 'Hampstead Home Extension',
    category: 'Renovation',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    description: 'A characterful extension designed to expand family living while preserving the home’s identity.',
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Discovery & Brief',
    text: 'We begin with conversations about lifestyle, constraints, opportunities and the atmosphere you want your space to create.',
  },
  {
    number: '02',
    title: 'Concept & Spatial Planning',
    text: 'We translate your brief into a clear design direction, spatial strategy and material narrative.',
  },
  {
    number: '03',
    title: 'Design Development',
    text: 'Layouts, detailing and finishes are refined with an emphasis on practicality, craftsmanship and longevity.',
  },
  {
    number: '04',
    title: 'Technical Design & Project Coordination',
    text: 'We coordinate documentation, consultant interfaces and build strategy. Planning approvals, contracting and construction services depend on the agreed scope and professional appointments.',
  },
];

const serviceAreas = [
  'Chelsea', 'Kensington', 'Hampstead', 'Islington', 'Notting Hill', 'South Kensington', 'Marylebone', 'Clapham', 'Barnes', 'Wimbledon', 'Hammersmith', 'Southbank', 'Surrounding London areas',
];

const projectTypes = ['Residential', 'Commercial', 'Hospitality', 'Mixed Use', 'Development'];
const propertyTypes = ['House', 'Townhouse', 'Apartment', 'Flat', 'Commercial Premises', 'Retail', 'Hospitality Space'];
const budgetOptions = ['Under £50k', '£50k – £150k', '£150k – £300k', '£300k – £750k', '£750k – £1.5m', '£1.5m+'];

function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    telephone: '',
    location: '',
    projectType: '',
    propertyType: '',
    budget: '',
    timeline: '',
    projectDescription: '',
    consent: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState({ type: '', message: '' });

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 20);
    updateScrollState();
    window.addEventListener('scroll', updateScrollState);
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = {
      fullName: 'Please enter your full name.',
      email: 'Please enter a valid email address.',
      projectType: 'Please select a project type.',
      propertyType: 'Please select a property type.',
      budget: 'Please select an approximate budget.',
      projectDescription: 'Please provide a brief description of your project.',
    };

    Object.entries(requiredFields).forEach(([field, message]) => {
      if (!formData[field] || (field === 'email' && !/\S+@\S+\.\S+/.test(formData.email))) {
        errors[field] = message;
      }
    });

    if (!formData.consent) {
      errors.consent = 'Please confirm that you agree to the privacy policy.';
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSubmitState({
        type: 'error',
        message: 'Please check the highlighted fields and try again.',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitState({ type: '', message: '' });

    if (!siteConfig.formEndpoint) {
      setIsSubmitting(false);
      setSubmitState({
        type: 'error',
        message: 'No secure form endpoint has been configured yet. Add VITE_CONTACT_FORM_ENDPOINT in your environment to enable live submissions.',
      });
      return;
    }

    try {
      const response = await fetch(siteConfig.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Submission failed.');
      }

      setSubmitState({
        type: 'success',
        message: 'Your enquiry has been sent successfully. We will be in touch shortly.',
      });
      setFormData({
        fullName: '',
        email: '',
        telephone: '',
        location: '',
        projectType: '',
        propertyType: '',
        budget: '',
        timeline: '',
        projectDescription: '',
        consent: false,
      });
    } catch (error) {
      setSubmitState({
        type: 'error',
        message: 'There was a problem sending your enquiry. Please email us directly or try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-shell">
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container nav-wrap">
          <a className="brand" href="#home" aria-label="Studio homepage">Studio Name</a>

          <nav className="main-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <a key={item.label} href={item.href}>{item.label}</a>
            ))}
          </nav>

          <a className="button button-primary nav-button" href="#contact">Discuss Your Project</a>

          <button
            type="button"
            className="mobile-menu-toggle"
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileNavOpen((open) => !open)}
          >
            {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileNavOpen && (
          <div id="mobile-navigation" className="mobile-nav-panel">
            {navigation.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setMobileNavOpen(false)}>
                {item.label}
              </a>
            ))}
            <a className="button button-primary" href="#contact" onClick={() => setMobileNavOpen(false)}>
              Discuss Your Project
            </a>
          </div>
        )}
      </header>

      <main id="home">
        <section className="hero-section">
          <div className="hero-backdrop" />
          <div className="hero-overlay" />
          <div className="container hero-content">
            <p className="eyebrow">ARCHITECTURE · INTERIORS · LONDON</p>
            <h1>Spaces with Purpose. Architecture with Presence.</h1>
            <p className="hero-copy">
              Considered architecture and refined interiors for exceptional homes and spaces across London.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">Explore Our Work</a>
              <a className="button button-secondary" href="#contact">Discuss Your Project</a>
            </div>
          </div>
          <div className="scroll-indicator" aria-hidden="true">
            <span>Scroll</span>
            <ChevronDown size={16} />
          </div>
        </section>

        <section className="intro section-spacing">
          <div className="container intro-inner">
            <div className="section-heading-wrap">
              <p className="eyebrow eyebrow-dark">Studio approach</p>
              <h2>A considered approach to exceptional spaces.</h2>
            </div>
            <div className="intro-copy">
              <p>
                We create architecture and interiors that feel calm, intentional and lasting. From residential planning and quiet luxury interiors to refined renovations and tailored extensions, every decision is grounded in light, proportion, material honesty and how a space is lived in.
              </p>
              <p>
                Our work balances beauty with utility, creating homes and work environments that feel both highly personal and enduringly relevant.
              </p>
            </div>
          </div>
        </section>

        <section id="services" className="services section-spacing">
          <div className="container">
            <div className="section-heading-wrap section-heading-row">
              <div>
                <p className="eyebrow eyebrow-dark">What we do</p>
                <h2>Design services for modern London living.</h2>
              </div>
              <a className="text-link" href="#contact">
                Enquire about your project <ArrowUpRight size={18} />
              </a>
            </div>

            <div className="service-grid">
              {services.map((service) => (
                <article key={service.title} className="service-card">
                  <div className="service-image-wrap">
                    <img src={service.image} alt={service.title} loading="lazy" />
                  </div>
                  <div className="service-card-body">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <a href={service.href} className="inline-link">
                      Learn more <ArrowRight size={16} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="projects section-spacing">
          <div className="container">
            <div className="section-heading-wrap section-heading-row">
              <div>
                <p className="eyebrow eyebrow-dark">Selected work</p>
                <h2>Illustrative portfolio studies.</h2>
              </div>
              <div className="filter-group" role="tablist" aria-label="Project categories">
                {['All', 'Architecture', 'Interiors', 'Renovation'].map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={filter === activeFilter ? 'filter-button active' : 'filter-button'}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="project-grid">
              {filteredProjects.map((project, index) => (
                <article
                  key={project.title}
                  className={`project-card project-card-${index % 2 === 0 ? 'wide' : 'tall'}`}
                >
                  <div className="project-image-wrap">
                    <img src={project.image} alt={project.title} loading="lazy" />
                  </div>
                  <div className="project-card-body">
                    <span>{project.category}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="philosophy" className="philosophy section-spacing">
          <div className="container philosophy-grid">
            <div className="philosophy-image-panel">
              <img src="https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80" alt="Refined interior detail with soft natural light" loading="lazy" />
            </div>
            <div className="philosophy-content">
              <p className="eyebrow eyebrow-dark">Our philosophy</p>
              <h2>Design that balances beauty, purpose and permanence.</h2>
              <p>
                Our process is simple: understand how people want to live, then use architecture, materials and detail to support that everyday rhythm. We design with patience, paying close attention to proportion, craft and atmosphere.
              </p>
              <div className="philosophy-points">
                <div>
                  <span>Discover</span>
                  <p>We listen carefully to your brief, routines and aspirations.</p>
                </div>
                <div>
                  <span>Define</span>
                  <p>We establish the key ideas that shape the spatial and material direction.</p>
                </div>
                <div>
                  <span>Develop</span>
                  <p>We refine the design through plans, detailing, finishes and consultant coordination.</p>
                </div>
                <div>
                  <span>Deliver</span>
                  <p>We guide the project toward a confident and carefully realised outcome.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="process section-spacing">
          <div className="container">
            <div className="section-heading-wrap">
              <p className="eyebrow eyebrow-dark">Our process</p>
              <h2>From first conversations to final coordination.</h2>
            </div>

            <div className="process-grid">
              {processSteps.map((step) => (
                <article key={step.number} className="process-card">
                  <span className="process-number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="service-area section-spacing">
          <div className="container service-area-inner">
            <div>
              <p className="eyebrow eyebrow-dark">London service area</p>
              <h2>Working across London and surrounding neighbourhoods.</h2>
            </div>
            <div className="service-area-list" aria-label="London service locations">
              {serviceAreas.map((area) => (
                <span key={area}>{area}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="testimonials section-spacing" aria-hidden="true" hidden>
          <div className="container">
            <p className="eyebrow eyebrow-dark">Testimonials</p>
            <h2>Client feedback will be published here once approved.</h2>
          </div>
        </section>

        <section id="contact" className="enquiry section-spacing">
          <div className="container enquiry-grid">
            <div className="enquiry-copy">
              <p className="eyebrow eyebrow-dark">Project enquiry</p>
              <h2>Tell us about your London project.</h2>
              <p>
                We welcome conversations for residential interiors, architecture, renovations and thoughtfully considered property transformations.
              </p>
              <div className="contact-list">
                <a href={`mailto:${siteConfig.contactEmail}`}>
                  <Mail size={18} />
                  {siteConfig.contactEmail}
                </a>
                <a href={`tel:${siteConfig.contactPhone.replace(/\s+/g, '')}`}>
                  <Phone size={18} />
                  {siteConfig.contactPhone}
                </a>
                <span>
                  <MapPin size={18} />
                  London, United Kingdom
                </span>
              </div>
            </div>

            <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
              <div className="form-grid">
                <label>
                  <span>Full name</span>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    aria-invalid={Boolean(formErrors.fullName)}
                  />
                  {formErrors.fullName && <small>{formErrors.fullName}</small>}
                </label>

                <label>
                  <span>Email address</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    aria-invalid={Boolean(formErrors.email)}
                  />
                  {formErrors.email && <small>{formErrors.email}</small>}
                </label>

                <label>
                  <span>Telephone number</span>
                  <input type="tel" name="telephone" value={formData.telephone} onChange={handleInputChange} />
                </label>

                <label>
                  <span>Project postcode or location</span>
                  <input type="text" name="location" value={formData.location} onChange={handleInputChange} />
                </label>

                <label>
                  <span>Project type</span>
                  <select name="projectType" value={formData.projectType} onChange={handleInputChange} aria-invalid={Boolean(formErrors.projectType)}>
                    <option value="">Select</option>
                    {projectTypes.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                  {formErrors.projectType && <small>{formErrors.projectType}</small>}
                </label>

                <label>
                  <span>Property type</span>
                  <select name="propertyType" value={formData.propertyType} onChange={handleInputChange} aria-invalid={Boolean(formErrors.propertyType)}>
                    <option value="">Select</option>
                    {propertyTypes.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                  {formErrors.propertyType && <small>{formErrors.propertyType}</small>}
                </label>

                <label>
                  <span>Approximate project budget in GBP</span>
                  <select name="budget" value={formData.budget} onChange={handleInputChange} aria-invalid={Boolean(formErrors.budget)}>
                    <option value="">Select</option>
                    {budgetOptions.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                  {formErrors.budget && <small>{formErrors.budget}</small>}
                </label>

                <label>
                  <span>Desired start date or timeline</span>
                  <input type="text" name="timeline" value={formData.timeline} onChange={handleInputChange} />
                </label>
              </div>

              <label className="textarea-label">
                <span>Project description</span>
                <textarea
                  name="projectDescription"
                  rows="5"
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  aria-invalid={Boolean(formErrors.projectDescription)}
                />
                {formErrors.projectDescription && <small>{formErrors.projectDescription}</small>}
              </label>

              <label className="consent-row">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleInputChange}
                  aria-invalid={Boolean(formErrors.consent)}
                />
                <span>
                  I agree to the privacy policy and consent to being contacted regarding my enquiry.
                </span>
              </label>
              {formErrors.consent && <small className="consent-error">{formErrors.consent}</small>}

              {submitState.message && <p className={`form-status ${submitState.type}`}>{submitState.message}</p>}

              <button type="submit" className="button button-primary submit-button" disabled={isSubmitting}>
                {isSubmitting ? 'Sending enquiry...' : 'Send enquiry'}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <a className="brand footer-brand" href="#home">Studio Name</a>
            <p>Architecture, interiors and considered transformations for London living.</p>
          </div>
          <div>
            <h3>Explore</h3>
            <ul>
              {navigation.map((item) => (
                <li key={item.label}><a href={item.href}>{item.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Services</h3>
            <ul>
              {services.slice(0, 6).map((service) => (
                <li key={service.title}><a href={service.href}>{service.title}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Contact</h3>
            <ul>
              <li><a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a></li>
              <li><a href={`tel:${siteConfig.contactPhone.replace(/\s+/g, '')}`}>{siteConfig.contactPhone}</a></li>
              <li><a href="/privacy-policy">Privacy policy</a></li>
              <li><a href="/cookie-preferences">Cookie preferences</a></li>
            </ul>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Studio Name. All rights reserved.</span>
          <span>London architecture & interiors</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
