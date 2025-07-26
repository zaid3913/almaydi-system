// تهيئة الشريط الجانبي عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
  // تحديد الصفحة الحالية وإضافة صنف active
  highlightCurrentPage();
  
  // إضافة تأثيرات تفاعلية لقوائم الشريط الجانبي
  setupMenuHoverEffects();
  
  // تهيئة زر تسجيل الخروج
  setupLogoutButton();
});

// تحديد الصفحة الحالية في القائمة
function highlightCurrentPage() {
  const currentPage = window.location.pathname.split('/').pop() || 'home.html';
  const menuItems = document.querySelectorAll('.sidebar-menu li a');
  
  menuItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPage) {
      item.classList.add('active');
      item.style.background = '#1abc9c';
    }
    
    // منع السلوك الافتراضي للروابط إذا كانت نفس الصفحة
    if (href === currentPage) {
      item.addEventListener('click', (e) => e.preventDefault());
    }
  });
}

// إعداد تأثيرات التحويم على القوائم
function setupMenuHoverEffects() {
  const menuItems = document.querySelectorAll('.sidebar-menu li a');
  
  menuItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      if (!this.classList.contains('active')) {
        this.style.transform = 'translateX(-5px)';
      }
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
}

// إعداد زر تسجيل الخروج
function setupLogoutButton() {
  const logoutBtn = document.querySelector('.logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      logout();
    });
  }
}

// دالة تسجيل الخروج
function logout() {
  // التحقق من وجود firebase قبل الاستخدام
  if (typeof firebase !== 'undefined' && firebase.auth) {
    firebase.auth().signOut().then(() => {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
      window.location.href = 'index.html';
    }).catch(error => {
      console.error('Error signing out: ', error);
      showAlert('حدث خطأ أثناء تسجيل الخروج', 'error');
    });
  } else {
    console.error('Firebase is not loaded');
    // Fallback في حالة عدم تحميل firebase
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
  }
}

// دالة مساعدة لعرض التنبيهات
function showAlert(message, type = 'success') {
  const alertBox = document.createElement('div');
  alertBox.className = `alert-box ${type}`;
  alertBox.textContent = message;
  
  document.body.appendChild(alertBox);
  
  setTimeout(() => {
    alertBox.remove();
  }, 3000);
}

// إمكانية الوصول للدوال من النافذة العالمية إذا لزم الأمر
window.sidebar = {
  logout: logout,
  highlightCurrentPage: highlightCurrentPage
};