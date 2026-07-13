import { MainLayout } from '@/shared/layouts/MainLayout';
import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';
import { NewsFeed } from '@/widgets/NewsFeed';
import { Sidebar } from '@/widgets/Sidebar';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <MainLayout
      sidebarLeft={<Sidebar />}
      sidebarRight={<NewsFeed isOpen={isOpen} setIsOpen={handleIsOpen} />}
      header={<Header onClickBell={handleIsOpen} />} // Сюда встанет ваша шапка с поиском
      footer={<Footer />} // Сюда встанет подвал
      content={<Outlet />} // Сюда роутер сам подставит FeedPage, ProfilePage и т.д.
    />
  );
};
