"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  ChevronDown,
  FileText,
  Zap,
  Link,
  Share,
  Puzzle,
  CreditCard,
  Users,
  HelpCircle,
  RefreshCcw,
  MessageCircle,
  User,
} from "lucide-react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const articlesMenu = {
  label: "Articles",
  icon: FileText,
  subItems: [
    { label: "Create Article", href: "/articles/create" },
    { label: "Search for Title & Keywords", href: "/articles/search" },
    { label: "Generated Articles", href: "/articles/generate-articles" },
    "separator",
    { label: "Keyword Projects", href: "/articles/keyword-projects" },
    { label: "AI Keyword to Article", href: "/articles/ai-keyword" },
    { label: "Steal Competitor Keyword", href: "/articles/competitor-keyword" },
    { label: "Manual Keyword to Article", href: "/articles/manual-keyword" },
    { label: "Bulk Keyword to Article", href: "/articles/bulk-keyword" },
    {
      label: "Longtail Keyword to Article",
      href: "/articles/longtail-keyword",
    },
    "separator",
    { label: "Article Settings", href: "/articles/settings" },
  ],
};

const otherMenuItems = [
  { label: "Auto Blog", icon: Zap, href: "/auto-blog" },
  { label: "Internal Links", icon: Link, href: "/internal-links" },
  { label: "Free Backlinks", icon: Share, href: "/backlinks" },
  { label: "Integrations", icon: Puzzle, href: "/integrations" },
  { label: "Subscription", icon: CreditCard, href: "/subscription" },
  { label: "Affiliate Program", icon: Users, href: "/affiliate" },
  { label: "Help Center", icon: HelpCircle, href: "/help" },
  { label: "Updates", icon: RefreshCcw, href: "/updates" },
  { label: "Live Chat Support", icon: MessageCircle, href: "/support" },
  { label: "Profile", icon: User, href: "/profile" },
];

export default function SidebarNav() {
  const router = useRouter();
  const [isArticlesOpen, setIsArticlesOpen] = useState(false);

  const currentPath = router.pathname;
  const activeItem = (() => {
    const other = otherMenuItems.find((item) => item.href === currentPath);
    if (other) return other.label;

    const article = articlesMenu.subItems.find(
      (item) => item !== "separator" && item.href === currentPath
    );
    if (article) return article.label;

    if (currentPath.startsWith("/articles")) return "Articles";
    return null;
  })();

  useEffect(() => {
    if (currentPath.startsWith("/articles")) {
      setIsArticlesOpen(true);
    } else {
      setIsArticlesOpen(false);
    }
  }, [currentPath]);

  const handleNavigation = (href) => {
    router.push(href);
  };

  return (
    <div className="">
          
    
    <div className="2xl:container 2xl:mx-auto">
      <Sidebar className=" overflow-y-auto">
        <SidebarHeader>
          <h2 onClick={()=>router.push("/")} className="text-4xl cursor-pointer font-extrabold mb-5 ml-5">abun</h2>
        </SidebarHeader>
        <SidebarContent className="ml-5">
          <SidebarMenu>
            {/* Articles Dropdown */}
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={activeItem === "Articles"}
                onClick={() => setIsArticlesOpen(!isArticlesOpen)}
                className="group"
              >
                <FileText className="size-4 text-blue-500 " />
                <span
                  className={`${
                    activeItem === "Articles" ? "text-blue-600" : "text-black"
                  }`}
                >
                  {articlesMenu.label}
                </span>
                <ChevronDown
                  className={`size-4 ml-auto text-blue-500 transition-transform ${
                    isArticlesOpen ? "rotate-180 duration-400" : ""
                  }`}
                />
              </SidebarMenuButton>

              {isArticlesOpen && (
                <SidebarMenuSub>
                  {articlesMenu.subItems.map((subItem, index) =>
                    subItem === "separator" ? (
                      <SidebarSeparator key={index} />
                    ) : (
                      <SidebarMenuSubItem key={index}>
                        <SidebarMenuSubButton
                          isActive={activeItem === subItem.label}
                          onClick={() => handleNavigation(subItem.href)}
                          className="group"
                        >
                          <span
                            className={`${
                              activeItem === subItem.label
                                ? "text-blue-600"
                                : "text-black"
                            }`}
                          >
                            {subItem.label}
                          </span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    )
                  )}
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>

            {/* Static Items */}
            {otherMenuItems.map((item, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton
                  isActive={activeItem === item.label}
                  onClick={() => handleNavigation(item.href)}
                  className="group"
                >
                  <item.icon
                    className={`size-4 ${
                      activeItem === item.label
                        ? "text-blue-600"
                        : "text-blue-500"
                    }`}
                  />
                  <span
                    className={`${
                      activeItem === item.label ? "text-blue-600" : "text-black"
                    }`}
                  >
                    {item.label}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </div>
    </div>
  );
}
