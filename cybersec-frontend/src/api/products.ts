export type Product = {
  id: number;
  product_type: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  price: number;
  bundle_with: number[];
};

// 假資料 - 基於 cybersec_backend/data/products.json
const mockProducts: Product[] = [
  {
    id: 0,
    product_type: "hardware",
    name: "FortiGate 60F",
    description: "FortiGate 60F 是 Fortinet 推出的一款高效能網路安全設備，適合中小企業部署於總部或分支據點。本產品配備 Fortinet 自家設計的 SoC4 處理器，具備極高的資料處理效能，支援高達 10 Gbps 的防火牆效能。其整合多項資安功能如：入侵防禦系統（IPS）、惡意軟體掃描、應用控制、Web 過濾、沙箱分析與雲端威脅情報。FortiGate 60F 提供 VPN（IPSec / SSL）支援，可實現安全的遠端辦公。其 GUI 管理介面簡潔直觀，適合資安專業人員快速部署與日常維運。此外，支援 SD-WAN 功能，企業可彈性管理多條網路線路，提升服務品質與成本效率。適用於具備資訊合規需求的中小企業，亦適合進行 ISO 27001、NIST CSF 等框架下的資安建置。",
    category: "防火牆",
    tags: ["防火牆", "VPN", "中小企業", "SD-WAN", "IPS"],
    price: 15800,
    bundle_with: [2]
  },
  {
    id: 1,
    product_type: "software",
    name: "Symantec Endpoint Protection",
    description: "Symantec Endpoint Protection（SEP）是一套專為企業環境設計的端點安全解決方案。其核心特色在於整合式的防護策略，包含防病毒、反間諜程式、入侵防護、行為分析及應用控制等多層次防護機制。SEP 採用機器學習與全域威脅情報資料庫，即使面對未知惡意程式與零時差攻擊亦能有效偵測與隔離。管理員可透過集中式控制台部署政策、監控事件並自動生成安全報告，有助於資安合規與內部稽核。適合 50 人以上的企業、教育單位或政府機關實施端點防護控管。",
    category: "EDR",
    tags: ["端點保護", "勒索病毒", "AI分析", "行為偵測", "零時差攻擊"],
    price: 8900,
    bundle_with: []
  },
  {
    id: 2,
    product_type: "cloud",
    name: "Cloudflare DDoS Protection",
    description: "Cloudflare 提供的 DDoS Protection 是業界廣泛使用的雲端抗攻擊平台，透過其遍佈全球的 CDN 網路節點與智慧流量清洗中心，能在毫秒內識別與緩解超過 100 Tbps 的大規模攻擊流量。該服務可自動分辨正常與異常行為，支援 Layer 3/4/7 攻擊防禦，包含 SYN Flood、UDP Flood 及 HTTP Flood 等。此外，其管理平台支援即時分析、事件追蹤、攻擊報告產出，亦可整合 API 與 Webhook 自動回應機制。非常適合提供 API、遊戲服務、大型電商與金融業導入。",
    category: "DDoS防護",
    tags: ["DDoS", "CDN", "全球抗攻擊", "Web防護", "自動化"],
    price: 12000,
    bundle_with: []
  },
  {
    id: 3,
    product_type: "hardware",
    name: "Palo Alto PA-220",
    description: "Palo Alto PA-220 是一款專為分支據點與小型辦公室設計的次世代防火牆設備，搭載 PAN-OS 作業系統，支援應用層可視化、使用者識別、威脅預防與 URL 分類控制等進階功能。PA-220 提供全功能安全性而不犧牲效能，並支援虛擬路由、防火牆虛擬化分區（vSYS）與IPSec VPN 等。透過 Palo Alto 的 WildFire 沙箱服務，可將可疑檔案上傳分析並即時回報未知威脅。適合金融、醫療或政府場域使用，對資安政策有高度要求者。",
    category: "防火牆",
    tags: ["應用層防護", "VPN", "虛擬防火牆", "零信任", "WildFire"],
    price: 26800,
    bundle_with: [5]
  },
  {
    id: 4,
    product_type: "software",
    name: "Trend Micro Deep Security",
    description: "Deep Security 是由趨勢科技推出的企業級伺服器與虛擬機保護平台。其設計針對混合雲架構，包含漏洞防護、惡意程式掃描、防火牆、入侵防禦（IPS）、應用程式控制與記錄完整性監控等功能。可與 AWS、Azure、VMware 等環境無縫整合，並提供日誌記錄與合規報告，符合 PCI-DSS、HIPAA、ISO 等多項法規。建議部署於雲端虛擬主機與重要資料庫系統上。",
    category: "雲端安全",
    tags: ["虛擬機", "漏洞防護", "混合雲", "AWS", "Azure"],
    price: 13200,
    bundle_with: []
  },
  {
    id: 5,
    product_type: "cloud",
    name: "Zscaler Internet Access",
    description: "Zscaler Internet Access 是一項基於雲的網路存取服務（SASE 核心組件之一），所有連線都會導向雲端閘道進行安全分析與過濾。它結合了 Web Proxy、SSL 檢查、URL 過濾、沙箱分析與資料外洩防護（DLP）等技術，可有效防止內外部威脅。平台採用零信任架構，不論使用者位置，皆需驗證與授權才可存取資源，並具備完整的審查與紀錄機制。適合多據點組織或混合辦公環境部署。",
    category: "安全閘道",
    tags: ["SASE", "Web防護", "DLP", "零信任", "SSL檢查"],
    price: 16500,
    bundle_with: []
  },
  {
    id: 6,
    product_type: "software",
    name: "Elastic SIEM",
    description: "Elastic SIEM 是 Elastic Stack（ELK）的一部分，專為資安事件監控與可視化分析設計。其結合 Filebeat、Logstash 與 Elasticsearch，可收集系統日誌、端點事件與網路紀錄，並透過 Kibana 建立儀表板與告警規則。Elastic SIEM 強調彈性架構與即時反應，支援 MITRE ATT&CK 以及內建威脅偵測規則，便於資安分析人員快速發現異常行為。適合建構自主 SOC 或需大量日誌分析的企業環境。",
    category: "SIEM",
    tags: ["日誌分析", "威脅偵測", "MITRE", "SOC", "Kibana"],
    price: 19900,
    bundle_with: []
  },
  {
    id: 7,
    product_type: "hardware",
    name: "Cisco ASA 5506-X",
    description: "Cisco ASA 5506-X 是一款入門級多功能防火牆設備，專為中小企業設計。其支援狀態封包檢查、VPN 建立、IPS 與基礎 URL 過濾功能，並可搭配 Cisco FirePOWER 提供進階威脅防護模組（FTD）。此外具備集中管理與報表功能，能夠整合 Cisco Umbrella 與 ISE（身份識別服務），強化端點與雲端防護。",
    category: "防火牆",
    tags: ["Cisco", "VPN", "IPS", "中小企業", "FTD"],
    price: 17200,
    bundle_with: []
  },
  {
    id: 8,
    product_type: "cloud",
    name: "AWS Shield Advanced",
    description: "AWS Shield Advanced 是專為 AWS 客戶提供的進階 DDoS 防護服務，提供 L3/L4 自動化防禦、流量分析與緊急事件支援。其具備封包即時監控、流量趨勢可視化與自動黑洞路由，可迅速處理惡意流量。與 AWS WAF 結合後可針對應用層攻擊進行精準防禦，並享有事件回溯支援與事前風險警告機制。適合運行在 AWS 上之電商、API、金融服務業應用程式。",
    category: "DDoS防護",
    tags: ["AWS", "DDoS", "WAF", "即時監控", "雲端防禦"],
    price: 35000,
    bundle_with: []
  },
  {
    id: 9,
    product_type: "software",
    name: "Wazuh XDR",
    description: "Wazuh 是一套免費開源的 XDR 解決方案，可整合日誌管理、端點威脅偵測、完整性監控、漏洞管理與自動化回應。支援多平台系統（Linux, Windows, macOS）部署，可將安全資料傳送至 Elastic Stack 進行分析與可視化展示。提供豐富的合規模組，如 PCI-DSS、GDPR、HIPAA，並具有自訂規則功能。適合具備 DevSecOps 能力的團隊，或希望建立內部 SOC 的中小型企業使用。",
    category: "XDR",
    tags: ["開源", "合規", "Log", "端點監控", "自動化"],
    price: 0,
    bundle_with: []
  },
  {
    id: 10,
    product_type: "software",
    name: "Zero Trust Security Platform",
    description: "提供全面的零信任架構實作，支援微分段、用戶識別與細緻存取控制。可部署於資料中心與多雲架構，協助中大型企業強化東西向流量安全。",
    category: "Zero Trust",
    tags: ["微分段", "存取控制", "合規", "多雲", "身份驗證"],
    price: 38000,
    bundle_with: []
  },
  {
    id: 11,
    product_type: "software",
    name: "Security Orchestration & Automation",
    description: "一套可與現有 SIEM、EDR 整合的自動化響應平台，能根據威脅指標自動封鎖惡意流量或隔離端點，有效提升資安事件處理效率。",
    category: "SOAR",
    tags: ["自動化", "威脅響應", "SIEM整合", "EDR控制"],
    price: 28500,
    bundle_with: []
  },
  {
    id: 12,
    product_type: "cloud",
    name: "Certificate Lifecycle Manager",
    description: "集中化管理所有 SSL/TLS 憑證生命週期，支援自動申請、續期、撤銷與合規報告，降低系統中斷風險。",
    category: "憑證管理",
    tags: ["PKI", "SSL", "自動化", "CA整合", "到期警示"],
    price: 19800,
    bundle_with: []
  },
  {
    id: 13,
    product_type: "platform",
    name: "All-in-One Endpoint Security Suite",
    description: "結合端點防護、風險管理、身分分析、威脅情報與下一代 SIEM 的一體化平台，專為中大型機構簡化資安操作而設計。",
    category: "端點防護",
    tags: ["EDR", "身份威脅", "SOC整合", "自動化獵威", "資訊保護"],
    price: 42800,
    bundle_with: []
  },
  {
    id: 14,
    product_type: "cloud",
    name: "Mobile App Protection Service",
    description: "針對行動應用開發商的 App 保護服務，內嵌於應用程式內，有效防止偽冒、逆向與資料外洩風險。",
    category: "App 安全",
    tags: ["金融 App", "逆向防護", "資料防洩", "API 保護"],
    price: 23600,
    bundle_with: []
  },
  {
    id: 15,
    product_type: "software",
    name: "Zeros Phishing Detection Engine",
    description: "Cyberforce 自研的釣魚網站識別引擎，透過 AI 分析 URL 模式與網頁內容，可即時評分並阻擋可疑連結。",
    category: "反釣魚",
    tags: ["AI判別", "即時偵測", "瀏覽器防護", "SOC整合"],
    price: 16800,
    bundle_with: []
  }
];

// 模擬 API 延遲
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchProducts(): Promise<Product[]> {
  // 模擬網路延遲
  await delay(500);
  
  // 模擬成功回傳假資料
  console.log("📦 使用假資料載入產品列表");
  return mockProducts;
}

export async function fetchProductById(id: number): Promise<Product | null> {
  // 模擬網路延遲
  await delay(300);
  
  const product = mockProducts.find(p => p.id === id);
  console.log(`📦 使用假資料載入產品 ID: ${id}`);
  return product || null;
}