import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
  });

  // Icons
  const EditIcon = getIcon('Edit');
  const SaveIcon = getIcon('Save');
  const UserIcon = getIcon('User');
  const MailIcon = getIcon('Mail');
  const PhoneIcon = getIcon('Phone');
  const MapPinIcon = getIcon('MapPin');
  const GlobeIcon = getIcon('Globe');
  const PackageIcon = getIcon('Package');

  const handleEditToggle = () => {
    if (isEditing) {
      // If saving, show success toast
      toast.success('Profile updated successfully');
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would save changes to a backend
    handleEditToggle();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-surface-800 rounded-lg shadow-md border border-surface-200 dark:border-surface-700 overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-white p-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">My Profile</h1>
              <button
                onClick={handleEditToggle}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-2 transition duration-150"
                aria-label={isEditing ? "Save profile" : "Edit profile"}
              >
                {isEditing ? (
                  <SaveIcon className="w-5 h-5" />
                ) : (
                  <EditIcon className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="mt-2">Manage your personal information and preferences</p>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Profile Image */}
                <div className="md:col-span-2 flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-surface-200 dark:bg-surface-700 flex items-center justify-center">
                      <UserIcon className="w-16 h-16 text-surface-500 dark:text-surface-400" />
                    </div>
                    {isEditing && (
                      <button
                        type="button"
                        className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 shadow-md hover:bg-primary-dark transition duration-150"
                        onClick={() => toast.info("Profile picture upload will be implemented soon")}
                      >
                        <EditIcon className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <div className="flex items-center text-surface-500 dark:text-surface-400">
                    <UserIcon className="w-5 h-5 mr-2" />
                    <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={profileData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-surface-700 dark:text-white"
                      required
                    />
                  ) : (
                    <p className="text-lg font-medium text-surface-900 dark:text-white">{user?.name || 'Not provided'}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <div className="flex items-center text-surface-500 dark:text-surface-400">
                    <MailIcon className="w-5 h-5 mr-2" />
                    <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                  </div>
                  {isEditing ? (
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-surface-700 dark:text-white"
                      required
                    />
                  ) : (
                    <p className="text-lg font-medium text-surface-900 dark:text-white">{user?.email || 'Not provided'}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <div className="flex items-center text-surface-500 dark:text-surface-400">
                    <PhoneIcon className="w-5 h-5 mr-2" />
                    <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                  </div>
                  {isEditing ? (
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-surface-700 dark:text-white"
                    />
                  ) : (
                    <p className="text-lg font-medium text-surface-900 dark:text-white">{profileData.phone || 'Not provided'}</p>
                  )}
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <div className="flex items-center text-surface-500 dark:text-surface-400">
                    <MapPinIcon className="w-5 h-5 mr-2" />
                    <label htmlFor="address" className="text-sm font-medium">Address</label>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={profileData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-surface-700 dark:text-white"
                    />
                  ) : (
                    <p className="text-lg font-medium text-surface-900 dark:text-white">{profileData.address || 'Not provided'}</p>
                  )}
                </div>

                {/* City */}
                <div className="space-y-2">
                  <div className="flex items-center text-surface-500 dark:text-surface-400">
                    <MapPinIcon className="w-5 h-5 mr-2" />
                    <label htmlFor="city" className="text-sm font-medium">City</label>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={profileData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-surface-700 dark:text-white"
                    />
                  ) : (
                    <p className="text-lg font-medium text-surface-900 dark:text-white">{profileData.city || 'Not provided'}</p>
                  )}
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <div className="flex items-center text-surface-500 dark:text-surface-400">
                    <GlobeIcon className="w-5 h-5 mr-2" />
                    <label htmlFor="country" className="text-sm font-medium">Country</label>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={profileData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-surface-700 dark:text-white"
                    />
                  ) : (
                    <p className="text-lg font-medium text-surface-900 dark:text-white">{profileData.country || 'Not provided'}</p>
                  )}
                </div>

                {/* Postal Code */}
                <div className="space-y-2">
                  <div className="flex items-center text-surface-500 dark:text-surface-400">
                    <PackageIcon className="w-5 h-5 mr-2" />
                    <label htmlFor="postalCode" className="text-sm font-medium">Postal Code</label>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={profileData.postalCode}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-surface-700 dark:text-white"
                    />
                  ) : (
                    <p className="text-lg font-medium text-surface-900 dark:text-white">{profileData.postalCode || 'Not provided'}</p>
                  )}
                </div>
              </div>

              {/* Save Button - Only show when editing */}
              {isEditing && (
                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="mr-4 px-6 py-2 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition duration-150"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition duration-150"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Member since info */}
        <div className="mt-6 text-center text-sm text-surface-500 dark:text-surface-400">
          Member since {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default Profile;