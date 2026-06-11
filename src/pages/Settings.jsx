import React, { useState } from 'react'
import { Bell, Shield, Globe, Palette, Save, ChevronRight, Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from '../context/AppContext'

function SettingSection({ icon: Icon, title, desc, children }) {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl border border-dark-100 dark:border-dark-700 shadow-card overflow-hidden animate-fade-in">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-dark-100 dark:border-dark-700 bg-dark-50/50 dark:bg-dark-900/50">
        <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
          <Icon size={15} className="text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <h3 className="font-semibold text-dark-900 dark:text-white text-sm">{title}</h3>
          {desc && <p className="text-xs text-dark-400 dark:text-dark-500">{desc}</p>}
        </div>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  )
}

function ToggleRow({ label, desc, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-dark-800 dark:text-dark-200">{label}</p>
        {desc && <p className="text-xs text-dark-400 dark:text-dark-500 mt-0.5">{desc}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 ${checked ? 'bg-accent-600' : 'bg-dark-200 dark:bg-dark-600'}`}
      >
        <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  )
}

export default function Settings() {
  const { dark, toggle } = useTheme()
  const [notifs, setNotifs] = useState({ email: true, push: false, sms: true, weekly: true })
  const [schoolName, setSchoolName] = useState('Lớp Trẻ Tư Thục Hồng Phúc')
  const [address, setAddress] = useState('Quận 3, TP. Hồ Chí Minh')
  const [phone, setPhone] = useState('028-1234-5678')
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-dark-900 dark:text-white">Cài đặt</h2>
          <p className="text-sm text-dark-400 dark:text-dark-500 mt-0.5">Tùy chỉnh hệ thống quản lý trường</p>
        </div>
        <button onClick={handleSave} className={`btn-primary text-xs transition-all ${saved ? 'bg-green-600 hover:bg-green-700' : ''}`}>
          <Save size={13} />
          {saved ? 'Đã lưu!' : 'Lưu thay đổi'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* School info */}
        <SettingSection icon={Globe} title="Thông tin trường" desc="Cập nhật thông tin cơ sở">
          <div className="space-y-3">
            {[
              { label: 'Tên trường', value: schoolName, onChange: setSchoolName },
              { label: 'Địa chỉ', value: address, onChange: setAddress },
              { label: 'Số điện thoại', value: phone, onChange: setPhone },
            ].map(({ label, value, onChange }) => (
              <div key={label}>
                <label className="block text-xs font-medium text-dark-600 dark:text-dark-400 mb-1">{label}</label>
                <input value={value} onChange={e => onChange(e.target.value)} className="input-field" />
              </div>
            ))}
          </div>
        </SettingSection>

        {/* Theme */}
        <SettingSection icon={Palette} title="Giao diện" desc="Tùy chỉnh màu sắc và chế độ hiển thị">
          <div>
            <p className="text-xs font-medium text-dark-600 dark:text-dark-400 mb-3">Chế độ màu sắc</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Sáng', icon: Sun, value: false },
                { label: 'Tối', icon: Moon, value: true },
                { label: 'Hệ thống', icon: Monitor, value: null },
              ].map(({ label, icon: Icon, value }) => (
                <button
                  key={label}
                  onClick={() => value !== null && value !== dark && toggle()}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                    (value === null ? false : value === dark)
                      ? 'border-accent-600 bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-300'
                      : 'border-dark-200 dark:border-dark-700 text-dark-500 dark:text-dark-400 hover:border-dark-300 dark:hover:border-dark-600'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-xs font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="pt-2 border-t border-dark-100 dark:border-dark-700">
            <p className="text-xs font-medium text-dark-600 dark:text-dark-400 mb-3">Màu chủ đạo</p>
            <div className="flex gap-2">
              {['#dc2626','#2563eb','#16a34a','#7c3aed','#d97706'].map(c => (
                <button key={c} className="w-8 h-8 rounded-full border-2 border-white dark:border-dark-800 shadow hover:scale-110 transition-transform ring-2 ring-transparent hover:ring-dark-300 dark:hover:ring-dark-500" style={{ background: c }} />
              ))}
            </div>
          </div>
        </SettingSection>

        {/* Notifications */}
        <SettingSection icon={Bell} title="Thông báo" desc="Cấu hình kênh nhận thông báo">
          <div className="space-y-4">
            <ToggleRow label="Thông báo email" desc="Nhận cập nhật qua email" checked={notifs.email} onChange={v => setNotifs(n => ({ ...n, email: v }))} />
            <ToggleRow label="Thông báo SMS" desc="Gửi SMS cho phụ huynh" checked={notifs.sms} onChange={v => setNotifs(n => ({ ...n, sms: v }))} />
            <ToggleRow label="Push notification" desc="Thông báo trên trình duyệt" checked={notifs.push} onChange={v => setNotifs(n => ({ ...n, push: v }))} />
            <ToggleRow label="Báo cáo tuần" desc="Tóm tắt hoạt động mỗi tuần" checked={notifs.weekly} onChange={v => setNotifs(n => ({ ...n, weekly: v }))} />
          </div>
        </SettingSection>

        {/* Security */}
        <SettingSection icon={Shield} title="Bảo mật" desc="Quản lý mật khẩu và phiên đăng nhập">
          <div className="space-y-3">
            {[
              { label: 'Mật khẩu hiện tại', type: 'password', placeholder: '••••••••' },
              { label: 'Mật khẩu mới', type: 'password', placeholder: '••••••••' },
              { label: 'Xác nhận mật khẩu', type: 'password', placeholder: '••••••••' },
            ].map(({ label, type, placeholder }) => (
              <div key={label}>
                <label className="block text-xs font-medium text-dark-600 dark:text-dark-400 mb-1">{label}</label>
                <input type={type} placeholder={placeholder} className="input-field" />
              </div>
            ))}
            <button className="btn-primary text-xs w-full justify-center mt-2">Đổi mật khẩu</button>
          </div>
        </SettingSection>
      </div>
    </div>
  )
}
