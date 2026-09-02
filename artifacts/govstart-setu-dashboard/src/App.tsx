import { createContext, type FormEvent, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Bell,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  Clock3,
  ExternalLink,
  FileText,
  Landmark,
  Lightbulb,
  LineChart,
  LockKeyhole,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  UsersRound,
  WalletCards,
  X,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

type ToastMessage = string | null;
type NavItem = 'Identify Challenges' | 'Pilot Workspace' | 'Procure Solutions';
const SearchContext = createContext({ value: '', setValue: (_value: string) => {} });

const problems = [
  {
    id: 'traffic',
    title: 'Smart Traffic Optimization for Bengaluru',
    copy: 'Reducing congestion in Metro cities empowers enforcement challenges.',
    matches: '20',
  },
  {
    id: 'records',
    title: 'Digital Land Records via Blockchain',
    copy: 'Focus on transparency for mentory and decentralized security and invtixvity moroner.',
    matches: '315',
  },
  {
    id: 'water',
    title: 'AI for Urban Water Management',
    copy: 'Detecting leaks early and making every drop visible across city networks.',
    matches: '42',
  },
];

const tenders = [
  { id: 'bins', title: 'E1. Tender for Smart Waste Bins', meta: 'Randomized: $7.31M • Date: 25-14-2023', type: 'procurement' },
  { id: 'schools', title: 'E2. Request for Proposal: EdTech for Rural Schools', meta: 'Randomized: $7.31M • Date: 12-19-2023', type: 'education' },
  { id: 'health', title: 'E3. EOI: Digital Healthcare Platforms', meta: 'Randomized: $3.31M • Date: 16-09-2023', type: 'health' },
];

const timelineItems = [
  { id: 'drone', phase: 'Phase 21', title: 'A1. Drone-based Crop Monitoring (Phase 2)', state: 'Status' },
  { id: 'water', phase: 'Phase 22', title: 'A2. AI for Urban Water Management (Proof of Concept)', state: 'Status' },
  { id: 'solar', phase: 'Phase 23', title: 'A3. Solar Power Grid Edge Analytics (Pre-Pilot)', state: 'Status', warn: true },
  { id: 'records', phase: 'Phase 24', title: 'A4. Secure Digital Records Exchange', state: 'Status' },
];

const startupMatches = [
  {
    id: 'urbanpulse',
    name: 'UrbanPulse Technologies',
    specialty: 'AI traffic intelligence & adaptive signals',
    score: 96,
    reason: 'Strong match for congestion forecasting and live traffic optimisation.',
  },
  {
    id: 'civisense',
    name: 'CiviSense Labs',
    specialty: 'Computer vision for public infrastructure',
    score: 91,
    reason: 'Proven city pilots with camera-based incident detection.',
  },
  {
    id: 'routecraft',
    name: 'RouteCraft Mobility',
    specialty: 'Transit routing & commuter analytics',
    score: 87,
    reason: 'Best fit for public transport coordination and commuter insights.',
  },
];

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function GovSetuLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`govsetu-logo ${compact ? 'compact' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M8 26.5 20 8l12 18.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 24.5v7M20 21v10.5M28 24.5v7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M7 31.5h26" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
        <circle cx="20" cy="8" r="3" fill="currentColor" />
        <circle cx="8" cy="26.5" r="3" fill="currentColor" />
        <circle cx="32" cy="26.5" r="3" fill="currentColor" />
      </svg>
    </span>
  );
}

function Router() {
  const [location] = useLocation();
  return (
    <RoutedErrorBoundary>
      <AppShell isDetail={location.startsWith('/pilot/')}>
        <Switch>
          <Route path="/" component={DashboardPage} />
          <Route path="/pilot/:id" component={PilotDetailPage} />
          <Route component={NotFound} />
        </Switch>
      </AppShell>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function AppShell({ children, isDetail }: { children: ReactNode; isDetail: boolean }) {
  const [, setLocation] = useLocation();
  const [activeNav, setActiveNav] = useState<NavItem>(isDetail ? 'Pilot Workspace' : 'Identify Challenges');
  const [toast, setToast] = useState<ToastMessage>(null);
  const [globalSearch, setGlobalSearch] = useState('');

  useEffect(() => {
    setActiveNav(isDetail ? 'Pilot Workspace' : 'Identify Challenges');
  }, [isDetail]);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2800);
  };

  const handleNav = (item: NavItem) => {
    setActiveNav(item);
    if (item === 'Identify Challenges') {
      setLocation('/');
      return;
    }
    if (item === 'Pilot Workspace') {
      setLocation('/pilot/2026-89');
      return;
    }
    notify(`${item} view selected`);
  };

  return (
    <div className="app-frame">
      <div className="portal-wrap">
        <section className="portal-window" aria-label="GovSetu workspace">
          <div className="window-top">
            <Link href="/" className="window-brand" data-testid="link-home-brand">
              <GovSetuLogo compact />
              <span><strong>GovSetu</strong><small>Startup Innovation &amp; Public Procurement Portal</small></span>
            </Link>
            <div className="window-tools">
              <label className="search-box" aria-label="Search portal">
                <Search />
                <input value={globalSearch} onChange={(event) => setGlobalSearch(event.target.value)} data-testid="input-global-search" placeholder="Search" />
              </label>
              <button className="icon-button" type="button" data-testid="button-notifications" onClick={() => notify('You have 3 new workspace updates')}>
                <Bell />
                <span className="notification-dot">3</span>
              </button>
              <span className="avatar" data-testid="avatar-user">US</span>
            </div>
          </div>
          <nav className="main-nav" aria-label="Main navigation">
            {([
              { item: 'Identify Challenges', icon: <Lightbulb />, hint: 'Discover' },
              { item: 'Pilot Workspace', icon: <Clock3 />, hint: 'Run pilots' },
              { item: 'Procure Solutions', icon: <Landmark />, hint: 'Buy better' },
            ] as { item: NavItem; icon: ReactNode; hint: string }[]).map(({ item, icon, hint }) => (
              <button
                key={item}
                className={activeNav === item ? 'active' : ''}
                type="button"
                data-testid={`button-nav-${item.toLowerCase().replaceAll(' ', '-')}`}
                onClick={() => handleNav(item)}
              >
                <span className="nav-icon">{icon}</span>
                <span className="nav-copy"><strong>{item}</strong><small>{hint}</small></span>
              </button>
            ))}
          </nav>
          <SearchContext.Provider value={{ value: globalSearch, setValue: setGlobalSearch }}>
            {children}
          </SearchContext.Provider>
        </section>
      </div>
      {toast && <div className="toast" role="status" data-testid="status-toast"><CheckCircle2 />{toast}</div>}
    </div>
  );
}

function DashboardPage() {
  const { value: search, setValue: setSearch } = useContext(SearchContext);
  const [problemFilter, setProblemFilter] = useState('all');
  const [tenderFilter, setTenderFilter] = useState('all');
  const [timelineTab, setTimelineTab] = useState('Timeline');
  const [timelinePage, setTimelinePage] = useState(0);
  const [toast, setToast] = useState<ToastMessage>(null);
  const [problemStatement, setProblemStatement] = useState('How can Bengaluru reduce congestion during peak hours?');
  const [submittedProblem, setSubmittedProblem] = useState('How can Bengaluru reduce congestion during peak hours?');
  const [analysisStage, setAnalysisStage] = useState<'idle' | 'analyzing' | 'complete'>('complete');
  const [analysisStep, setAnalysisStep] = useState(5);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2500);
  };

  const filteredProblems = useMemo(() => problems.filter((problem) => {
    const matchesSearch = `${problem.title} ${problem.copy}`.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = problemFilter === 'all' || (problemFilter === 'high' && Number(problem.matches) < 100) || (problemFilter === 'new' && problem.id !== 'records');
    return matchesSearch && matchesFilter;
  }), [problemFilter, search]);

  const filteredTenders = useMemo(() => tenders.filter((tender) => {
    const matchesSearch = `${tender.title} ${tender.meta}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (tenderFilter === 'all' || tender.type === tenderFilter);
  }), [search, tenderFilter]);

  const displayedTimeline = timelineItems.slice(timelinePage * 3, timelinePage * 3 + 3);

  const analyzeProblem = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = problemStatement.trim();
    if (!value) {
      notify('Enter a government problem statement first');
      return;
    }
    setSubmittedProblem(value);
    setAnalysisStage('analyzing');
    setAnalysisStep(1);
    notify('AI is analysing the government problem statement');

    [2, 3, 4, 5].forEach((step, index) => {
      window.setTimeout(() => setAnalysisStep(step), (index + 1) * 420);
    });
    window.setTimeout(() => {
      setAnalysisStage('complete');
      notify('Top matching startups have been ranked');
    }, 1850);
  };

  return (
    <main className="main-content" data-testid="page-dashboard">
      <div className="dashboard-grid">
        <div className="stack">
          <section className="panel" data-testid="section-ranked-startups">
            <PanelHeader title="AI Match: Ranked Startups">
              <span className="ai-live"><Sparkles /> Live ranking</span>
            </PanelHeader>
            <div className="panel-body">
              {analysisStage === 'analyzing' ? (
                <div className="matching-empty" data-testid="status-matching-startups">
                  <Sparkles />
                  <strong>Finding and ranking startup solutions...</strong>
                  <span>AI is comparing capability, pilot readiness and public-sector fit.</span>
                </div>
              ) : (
                <div className="startup-list">
                  {startupMatches.map((startup, index) => (
                    <button className="startup-match" key={startup.id} type="button" data-testid={`button-startup-match-${startup.id}`} onClick={() => notify(`${startup.name} added to shortlist`)}>
                      <span className="rank-badge">{index + 1}</span>
                      <span className="startup-details">
                        <strong>{startup.name}</strong>
                        <small>{startup.specialty}</small>
                        <em>{startup.reason}</em>
                      </span>
                      <span className="match-score"><strong>{startup.score}%</strong><small>match</small></span>
                      <ChevronRight className="startup-chevron" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="panel" data-testid="section-problem-statements">
            <div className="problem-intake">
              <div className="intake-heading">
                <div>
                  <span className="eyebrow"><Landmark /> Government</span>
                  <h2>Post a problem statement</h2>
                  <p>Describe a public challenge and let AI find the strongest startup solutions.</p>
                </div>
                <span className="intake-step">01 / AI MATCHING</span>
              </div>
              <form className="problem-search" onSubmit={analyzeProblem}>
                <Search />
                <input
                  value={problemStatement}
                  onChange={(event) => setProblemStatement(event.target.value)}
                  placeholder="e.g. Reduce peak-hour congestion across Bengaluru"
                  aria-label="Government problem statement"
                  data-testid="input-government-problem"
                />
                <button className="solid-button" type="submit" data-testid="button-analyze-problem">
                  <Sparkles /> Analyze &amp; find startups
                </button>
              </form>
              <MatchingPipeline stage={analysisStage} step={analysisStep} />
              {analysisStage === 'complete' && (
                <div className="match-context" data-testid="text-matching-context">
                  <span>AI shortlist for</span>
                  <strong>“{submittedProblem}”</strong>
                </div>
              )}
            </div>
            <PanelHeader title="Identify: Top Problem Statements">
              <select className="select-control" data-testid="select-problem-filter" value={problemFilter} onChange={(event) => setProblemFilter(event.target.value)}>
                <option value="all">All Problem Statements</option>
                <option value="new">New this month</option>
                <option value="high">High match count</option>
              </select>
            </PanelHeader>
            <div className="panel-body">
              {filteredProblems.length ? filteredProblems.slice(0, 2).map((problem, index) => (
                <article className="statement" key={problem.id} data-testid={`card-problem-${problem.id}`}>
                  <div className="statement-title">{index + 1}. {problem.title}</div>
                  <p className="statement-copy">{problem.copy}</p>
                  <div className="statement-actions">
                    <button className="outline-button" type="button" data-testid={`button-view-problem-${problem.id}`} onClick={() => notify(`Opening details for ${problem.title}`)}>View Details</button>
                    <span className="statement-meta">New metrics: {problem.matches}</span>
                    <button className="solid-button" type="button" data-testid={`button-submit-proposal-${problem.id}`} onClick={() => notify('Proposal saved to your workspace')}>Submit Proposal</button>
                  </div>
                </article>
              )) : <div className="empty-state" data-testid="empty-problems">No problem statements match your search.</div>}
            </div>
          </section>

          <section className="panel" data-testid="section-tenders">
            <PanelHeader title="Procure Solutions">
              <select className="select-control" data-testid="select-tender-filter" value={tenderFilter} onChange={(event) => setTenderFilter(event.target.value)}>
                <option value="all">All Search</option>
                <option value="procurement">Procurement</option>
                <option value="education">Education</option>
                <option value="health">Healthcare</option>
              </select>
            </PanelHeader>
            <div className="metric-grid procure-metrics" aria-label="Procurement metrics">
              <MetricCard className="green" icon={<UsersRound />} label="Active Pilots" value="12" meter="Randomized" />
              <MetricCard className="gold" icon={<Clock3 />} label="Randomized" value="25.80N" />
              <MetricCard className="rose" icon={<WalletCards />} label="Funding Disbursed" value="$7.31 MN" />
              <MetricCard className="lilac" icon={<LineChart />} label="Scalable Isable Solutions" value="20" meter="Randomized" />
            </div>
            <div className="chip-row">
              <span className="chip"><ShieldCheck /> Prior Exp. Waived</span>
              <span className="chip gold"><Landmark /> Relaxed Turnover</span>
            </div>
            <div className="panel-body">
              <div className="tender-list">
                {filteredTenders.length ? filteredTenders.map((tender) => (
                  <button className="tender-item" type="button" key={tender.id} data-testid={`button-tender-${tender.id}`} onClick={() => notify(`${tender.title} added to review`)}>
                    <strong>{tender.title}</strong>
                    <small>{tender.meta}</small>
                  </button>
                )) : <div className="empty-state" data-testid="empty-tenders">No tenders match your search.</div>}
              </div>
            </div>
          </section>
        </div>

        <div className="stack">
          <section className="panel" data-testid="section-active-pocs">
            <PanelHeader title="Pilot: Active PoCs & Sandbox">
              <label className="search-box" aria-label="Search pilot timeline">
                <Search />
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search" data-testid="input-pilot-search" />
              </label>
            </PanelHeader>
            <div className="panel-body">
              <div className="tabs" role="tablist" style={{ display: 'flex', gap: 4, marginBottom: 5 }}>
                {['Timeline', 'Sandbox', 'Sanctions'].map((tab) => (
                  <button key={tab} type="button" role="tab" className={timelineTab === tab ? 'chip' : 'chip'} style={timelineTab === tab ? undefined : { color: '#738095', background: '#f1f3f6' }} data-testid={`tab-pocs-${tab.toLowerCase()}`} onClick={() => { setTimelineTab(tab); notify(`${tab} view selected`); }}>
                    {tab}
                  </button>
                ))}
              </div>
              {timelineTab === 'Timeline' ? (
                <>
                  {displayedTimeline.filter((item) => item.title.toLowerCase().includes(search.toLowerCase())).map((item) => (
                    <div className="timeline-row" key={item.id} data-testid={`row-poc-${item.id}`}>
                      <span className="phase">{item.phase}</span><span className="timeline-marker" />
                      <span className="timeline-label">{item.title}</span><span className={`status-tag ${item.warn ? 'warn' : ''}`}>{item.state}</span>
                    </div>
                  ))}
                  {!displayedTimeline.filter((item) => item.title.toLowerCase().includes(search.toLowerCase())).length && <div className="empty-state" data-testid="empty-pocs">No pilots match your search.</div>}
                  <div className="pager">
                    <button type="button" aria-label="Previous pilots" data-testid="button-pocs-previous" disabled={timelinePage === 0} onClick={() => setTimelinePage((page) => Math.max(0, page - 1))}><ChevronLeft /></button>
                    <span data-testid="text-pocs-page">{timelinePage + 1} of 2</span>
                    <button type="button" aria-label="Next pilots" data-testid="button-pocs-next" disabled={timelinePage === 1} onClick={() => setTimelinePage((page) => Math.min(1, page + 1))}><ChevronRight /></button>
                  </div>
                </>
              ) : (
                <div className="empty-state" data-testid="empty-poc-tab">{timelineTab} workspace is clear for the next review.</div>
              )}
            </div>
          </section>

        </div>
      </div>
      {toast && <div className="toast" role="status" data-testid="status-dashboard-toast"><CheckCircle2 />{toast}</div>}
    </main>
  );
}

function MetricCard({ className, icon, label, value, meter }: { className: string; icon: ReactNode; label: string; value: string; meter?: string }) {
  return (
    <article className={`metric-card ${className}`} data-testid={`metric-${label.toLowerCase().replaceAll(' ', '-')}`}>
      <div className="metric-label">{icon}{label}</div>
      <strong>{value}</strong>
      {meter && <><div className="meter"><span /></div><span className="meter-note">{meter}</span></>}
    </article>
  );
}

const pipelineSteps = [
  'Government',
  'Post Problem Statement',
  'AI Problem Analysis',
  'Find Matching Startups',
  'AI Ranking',
  'Startup Shortlist',
];

function MatchingPipeline({ stage, step }: { stage: 'idle' | 'analyzing' | 'complete'; step: number }) {
  return (
    <div className="matching-pipeline" aria-label="AI startup matching pipeline" data-testid="matching-pipeline">
      {pipelineSteps.map((label, index) => {
        const isComplete = stage === 'complete' || step > index + 1;
        const isCurrent = stage === 'analyzing' && step === index + 1;
        return (
          <div className="pipeline-step-group" key={label}>
            <div className={`pipeline-step ${isComplete ? 'complete' : ''} ${isCurrent ? 'current' : ''}`} data-testid={`pipeline-step-${index + 1}`}>
              <span className="pipeline-number">{isComplete ? <Check /> : index + 1}</span>
              <span>{label}</span>
              {isCurrent && <span className="pipeline-pulse">Processing</span>}
            </div>
            {index < pipelineSteps.length - 1 && <span className={`pipeline-arrow ${isComplete ? 'complete' : ''}`}>↓</span>}
          </div>
        );
      })}
    </div>
  );
}

function PanelHeader({ title, children }: { title: string; children?: ReactNode }) {
  return <div className="panel-head"><h2>{title}</h2>{children}</div>;
}

function PilotDetailPage() {
  const [, setLocation] = useLocation();
  const [modal, setModal] = useState<'progress' | 'sandbox' | 'contract' | null>(null);
  const [feedback, setFeedback] = useState('');
  const [replies, setReplies] = useState<string[]>([]);
  const [toast, setToast] = useState<ToastMessage>(null);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2500);
  };

  const submitFeedback = () => {
    const value = feedback.trim();
    if (!value) {
      notify('Write an update before sending');
      return;
    }
    setReplies((current) => [...current, value]);
    setFeedback('');
    notify('Reply shared with the official team');
  };

  return (
    <main className="main-content" data-testid="page-pilot-detail">
      <div className="detail-layout">
        <div className="detail-topline">
          <div><div className="detail-title">Department of Technical Education, Kanpur</div><span className="detail-id">ID: PILOT-2026-89</span></div>
          <div className="detail-actions">
            <button className="action-link" type="button" data-testid="button-back-dashboard" onClick={() => setLocation('/')}><ArrowLeft /> Back to workspace</button>
            <button className="action-link" type="button" data-testid="button-update-progress" onClick={() => setModal('progress')}><Clock3 /> Phase 2 in Progress</button>
            <button className="action-link primary" type="button" data-testid="button-upload-poc-report" onClick={() => notify('PoC report uploader opened')}><FileText /> Upload PoC Report</button>
          </div>
        </div>

        <section className="panel detail-panel" data-testid="section-milestones">
          <PanelHeader title="Milestone Tracking & Deliverables" />
          <div className="milestone-list">
            <Milestone icon={<Check />} title="Phase 1: Architecture & Prototyping" date="Aug 10, 2026" copy="Core architecture mapped and initial AI model trained with sample data." state="approved">
              <span className="mini-badge"><Check /> Approved</span><button className="mini-badge file" type="button" data-testid="button-arch-design" onClick={() => notify('Arch_Design.pdf downloaded')}><FileText /> Arch_Design.pdf</button>
            </Milestone>
            <Milestone icon={<Circle />} title="Phase 2: Sandbox Testing & API Integration" date="Expected: Sep 05, 2026" copy="Live testing in isolated sandbox. Integrate NLP models for student queries." state="pending">
              <span style={{ fontSize: 9, color: '#40506a' }}>65% Completed</span><div className="progress-line"><span /></div><button className="outline-button" type="button" data-testid="button-phase-progress" onClick={() => setModal('progress')}>Update Progress</button><button className="mini-badge file" type="button" data-testid="button-sandbox-url" onClick={() => setModal('sandbox')}><ExternalLink /> Sandbox URL</button>
            </Milestone>
            <Milestone icon={<LockKeyhole />} title="Phase 3: Final Security Audit & Deployment" date="TBD" copy="Security vetting by NIC and scaling the solution to live servers." state="locked" />
          </div>
        </section>

        <section className="panel detail-panel" data-testid="section-funding">
          <PanelHeader title="Funding & Escrow"><button className="more-button" type="button" aria-label="Funding details" data-testid="button-funding-details" onClick={() => notify('Escrow ledger is verified')}><WalletCards /></button></PanelHeader>
          <div className="amount"><span className="amount-label">Total Approved Grant</span><strong>₹15,00,000</strong></div>
          <div className="funding-rows">
            <div className="funding-row"><span>Disbursed (Ph1)</span><strong>₹5,00,000</strong></div>
            <div className="funding-row"><span>Pending (Escrow)</span><strong>₹10,00,000</strong></div>
          </div>
          <button className="contract-button" type="button" data-testid="button-smart-contract" onClick={() => setModal('contract')}><FileText /> View Smart Contract</button>
        </section>

        <section className="panel detail-panel feedback" data-testid="section-feedback">
          <PanelHeader title="Official's Feedback" />
          <div className="feedback-body">
            <div className="feedback-message">
              <span className="feedback-avatar">SG</span>
              <div><strong>Sanjay Gupta</strong><small>Nodal Officer, UP Govt</small><p>“Phase 1 prototype looks solid. For Phase 2, please ensure the system handles regional language queries efficiently. Sandbox access granted.”</p><span className="feedback-age">2 days ago</span></div>
            </div>
            {replies.map((reply, index) => (
              <div className="feedback-message" key={`${reply}-${index}`} style={{ marginTop: 7 }} data-testid={`feedback-reply-${index}`}><span className="feedback-avatar" style={{ background: '#2966a9' }}>US</span><div><strong>Your team</strong><small>Startup workspace</small><p>{reply}</p><span className="feedback-age">Just now</span></div></div>
            ))}
            <form className="feedback-form" onSubmit={(event) => { event.preventDefault(); submitFeedback(); }}>
              <input value={feedback} onChange={(event) => setFeedback(event.target.value)} placeholder="Type an update or reply..." data-testid="input-feedback" />
              <button className="send-button" type="submit" aria-label="Send feedback" data-testid="button-send-feedback"><Send /></button>
            </form>
          </div>
        </section>
      </div>
      {toast && <div className="toast" role="status" data-testid="status-detail-toast"><CheckCircle2 />{toast}</div>}
      {modal && <DetailModal type={modal} onClose={() => setModal(null)} onNotify={notify} />}
    </main>
  );
}

function Milestone({ icon, title, date, copy, state, children }: { icon: ReactNode; title: string; date: string; copy: string; state: 'approved' | 'pending' | 'locked'; children?: ReactNode }) {
  return (
    <article className="milestone" data-testid={`milestone-${state}`}>
      <span className={`milestone-icon ${state}`}>{icon}</span>
      <div><h3>{title}</h3><p className="date">{date}</p><p>{copy}</p>{children && <div className="milestone-tools">{children}</div>}</div>
    </article>
  );
}

function DetailModal({ type, onClose, onNotify }: { type: 'progress' | 'sandbox' | 'contract'; onClose: () => void; onNotify: (message: string) => void }) {
  const copy = {
    progress: { title: 'Update Phase 2 progress', body: 'Keep the official team aligned with the latest delivery status.', action: 'Save progress' },
    sandbox: { title: 'Sandbox access', body: 'The test environment is ready for approved pilot collaborators.', action: 'Copy sandbox URL' },
    contract: { title: 'Smart contract ledger', body: 'Escrow release is tied to the approved Phase 2 deliverable.', action: 'Acknowledge ledger' },
  }[type];
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="detail-modal-title" data-testid={`modal-${type}`}>
        <div className="modal-head"><h2 id="detail-modal-title">{copy.title}</h2><button className="icon-button" type="button" aria-label="Close dialog" data-testid="button-close-modal" onClick={onClose}><X /></button></div>
        <p>{copy.body}</p>
        {type === 'progress' && <><label htmlFor="progress-note" style={{ display: 'block', color: '#40516c', fontSize: 10, fontWeight: 700, marginBottom: 5 }}>Progress note</label><textarea id="progress-note" data-testid="textarea-progress" defaultValue="Regional language testing is underway." /></>}
        {type === 'sandbox' && <input readOnly value="https://sandbox.govstartsetu.in/pilot-2026-89" data-testid="input-sandbox-url" />}
        {type === 'contract' && <div style={{ display: 'grid', gap: 7, color: '#687587', fontSize: 11 }}><span><CheckCircle2 size={14} style={{ verticalAlign: -3, color: '#1aa881' }} /> Phase 1 release verified</span><span><ShieldCheck size={14} style={{ verticalAlign: -3, color: '#1aa881' }} /> Escrow protected</span></div>}
        <div className="modal-actions"><button className="outline-button" type="button" data-testid="button-cancel-modal" onClick={onClose}>Cancel</button><button className="solid-button" type="button" data-testid="button-confirm-modal" onClick={() => { onClose(); onNotify(copy.action); }}>{copy.action}</button></div>
      </section>
    </div>
  );
}

export default App;