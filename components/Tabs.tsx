import React, { Component, useEffect, useRef, useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {}

const FirstComponent: React.FC = () => <div>first</div>;
const SecondComponent: React.FC = () => <div>second</div>;
const ThirdComponent: React.FC = () => <div>third</div>;

const tabs = [
  {
    id: "First",
    name: "First",
    pane: FirstComponent,
  },
  {
    id: "Second",
    name: "Second",
    pane: SecondComponent,
  },
  {
    id: "Third",
    name: "Third",
    pane: ThirdComponent,
  },
];

const Tabs = (props: Props) => {
  const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);

  const Pane = activeTab.pane;

  return (
    <>
      <TabsList
        tabs={tabs}
        ariaLabel="my tabs"
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      <Pane />
    </>
  );
};

interface Tab {
  name: string;
  id: string;
  pane: React.FC;
}

interface TabsListProps {
  tabs: Tab[];
  ariaLabel: string;
  activeTab: Tab;
  setActiveTab: React.Dispatch<React.SetStateAction<Tab>>;
}

const TabsList = ({
  tabs,
  ariaLabel,
  activeTab,
  setActiveTab,
}: TabsListProps) => {
  const tabsRef = useRef<{ [x: string]: HTMLButtonElement | null }>({});
  const [focusedTab, setFocusedTab] = useState(activeTab.id);

  useEffect(() => {
    tabsRef?.current?.[focusedTab]?.focus();
  }, [focusedTab]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    const key = e.key;
    let focusedTabIndex;

    switch (key) {
      case "ArrowLeft":
        e.preventDefault();
        focusedTabIndex = tabs.findIndex((tab) => focusedTab === tab.id);
        console.log({ activeTabIndex: focusedTabIndex });
        if (focusedTabIndex > 0) {
          setFocusedTab(tabs[focusedTabIndex - 1].id);
        } else if (focusedTabIndex === 0) {
          setFocusedTab(tabs[tabs.length - 1].id);
        }
        break;
      case "ArrowRight":
        e.preventDefault();
        focusedTabIndex = tabs.findIndex((tab) => focusedTab === tab.id);
        if (focusedTabIndex < tabs.length - 1) {
          setFocusedTab(tabs[focusedTabIndex + 1].id);
        } else if (focusedTabIndex === tabs.length - 1) {
          setFocusedTab(tabs[0].id);
        }
        break;

      case "Home":
        e.preventDefault();
        setFocusedTab(tabs[0].id);
        break;
      case "End":
        e.preventDefault();
        setFocusedTab(tabs[tabs.length - 1].id);
        break;

      default:
        break;
    }
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      aria-orientation="horizontal"
      className="border-b border-gray-200 space-x-4 bg-yellow-400"
    >
      {tabs.map((tab) => (
        <button
          key={tab.name}
          role="tab"
          id={tab.id}
          aria-selected={tab.id === activeTab.id}
          aria-controls={tab.id + "-tab-pane"}
          className={classNames(
            tab.id === activeTab.id
              ? "border-indigo-500 text-indigo-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
            "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:bg-red-400"
          )}
          aria-current={tab.id === activeTab.id ? "page" : undefined}
          tabIndex={tab.id === activeTab.id ? 0 : -1}
          onClick={() => setActiveTab(tab)}
          onKeyDown={handleKeyDown}
          ref={(element) => (tabsRef.current[tab.id] = element)}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
