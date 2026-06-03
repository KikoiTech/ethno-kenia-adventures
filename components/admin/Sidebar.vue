<script setup lang="ts">
import { 
  LayoutDashboard, 
  Map, 
  Briefcase, 
  Mail, 
  FileCode, 
  ShieldCheck, 
  Users, 
  LogOut, 
  Leaf,
  ChevronRight
} from 'lucide-vue-next'

const { profile, isSuperAdmin, signOut } = useAdmin()

const navigation = [
  { name: 'Overview', icon: LayoutDashboard, href: '/admin/dashboard' },
  { name: 'Tours/Trips', icon: Map, href: '/admin/tours' },
  { name: 'Bookings', icon: Briefcase, href: '/admin/bookings' },
  { name: 'Inquiries', icon: Mail, href: '/admin/inquiries' },
]

const systemNavigation = [
  { name: 'Email Templates', icon: FileCode, href: '/admin/templates' },
  { name: 'Audit Logs', icon: ShieldCheck, href: '/admin/logs' },
  { name: 'Team Management', icon: Users, href: '/admin/team' },
]

const route = useRoute()
const isActive = (path: string) => route.path === path
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <div class="brand">
        <div class="brand-icon">
          <Leaf class="w-5 h-5 text-white" />
        </div>
        <span class="brand-name">Ethno Kenia</span>
      </div>
    </div>

    <nav class="sidebar-nav">
      <div class="nav-section">
        <span class="section-label">Operations</span>
        <div class="nav-items">
          <NuxtLink 
            v-for="item in navigation" 
            :key="item.name" 
            :to="item.href" 
            class="nav-link"
            :class="{ 'nav-link--active': isActive(item.href) }"
          >
            <component :is="item.icon" class="nav-icon" />
            <span class="nav-label">{{ item.name }}</span>
            <ChevronRight v-if="isActive(item.href)" class="nav-indicator" />
          </NuxtLink>
        </div>
      </div>

      <div v-if="isSuperAdmin" class="nav-section mt-8">
        <span class="section-label">System Control</span>
        <div class="nav-items">
          <NuxtLink 
            v-for="item in systemNavigation" 
            :key="item.name" 
            :to="item.href" 
            class="nav-link"
            :class="{ 'nav-link--active': isActive(item.href) }"
          >
            <component :is="item.icon" class="nav-icon" />
            <span class="nav-label">{{ item.name }}</span>
            <ChevronRight v-if="isActive(item.href)" class="nav-indicator" />
          </NuxtLink>
        </div>
      </div>
    </nav>

    <div class="sidebar-footer">
      <div class="user-info">
        <div class="user-avatar">
          {{ profile?.full_name?.charAt(0) || 'A' }}
        </div>
        <div class="user-details">
          <span class="user-name">{{ profile?.full_name || 'Admin' }}</span>
          <span class="user-role">{{ profile?.role?.replace('_', ' ') }}</span>
        </div>
      </div>
      <button class="logout-btn" @click="signOut">
        <LogOut class="w-4 h-4" />
        <span>Logout</span>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 280px;
  height: 100vh;
  background: #0d1610;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  color: #e8e2d9;
  position: sticky;
  top: 0;
}

.sidebar-header {
  padding: 2rem 1.5rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-icon {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #3d4a3d, #263326);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.brand-name {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: -0.01em;
}

.sidebar-nav {
  flex: 1;
  padding: 0 1rem;
  overflow-y: auto;
}

.nav-section {
  margin-bottom: 1.5rem;
}

.section-label {
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(240, 232, 220, 0.3);
  padding: 0 1rem;
  margin-bottom: 0.75rem;
  display: block;
}

.nav-items {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  text-decoration: none;
  color: rgba(232, 226, 217, 0.6);
  transition: all 0.2s;
  position: relative;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.03);
  color: #e8e2d9;
}

.nav-link--active {
  background: rgba(61, 74, 61, 0.2);
  color: #9ec89e;
  border: 1px solid rgba(61, 74, 61, 0.3);
}

.nav-icon {
  width: 1.1rem;
  height: 1.1rem;
}

.nav-label {
  font-size: 0.9rem;
  font-weight: 500;
}

.nav-indicator {
  width: 0.9rem;
  height: 0.9rem;
  margin-left: auto;
  opacity: 0.5;
}

.sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(0, 0, 0, 0.2);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.user-avatar {
  width: 36px;
  height: 36px;
  background: #c4714e;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: #e8e2d9;
}

.user-role {
  font-size: 0.7rem;
  color: rgba(240, 232, 220, 0.4);
  text-transform: capitalize;
}

.logout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.65rem;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.15);
  border-radius: 8px;
  color: #fca5a5;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.logout-btn:hover {
  background: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.3);
}
</style>
