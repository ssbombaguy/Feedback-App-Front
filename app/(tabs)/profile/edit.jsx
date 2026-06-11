import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProfileAvatar } from "../../../components/profile/ProfileAvatar";
import { ProfileReadOnlyFields } from "../../../components/profile/ProfileReadOnlyFields";
import { ProfileForm } from "../../../components/profile/ProfileForm";
import { EditProfileHeader } from "../../../components/profile/EditProfileHeader";
import { ProfileVerificationModal } from "../../../components/profile/ProfileVerificationModal";
import { EditProfileContainer } from "../../../components/profile/EditProfileContainer";

export default function EditProfile() {
  return (
    <EditProfileContainer>
      {({ theme, styles, userProfile, state, handlers }) => {
        const { verificationModal, isPending } = state;
        const {
          handleSendVerificationCode,
          handleVerifyCode,
          closeVerificationModal,
          handleFormSubmit,
        } = handlers;

        return (
          <SafeAreaView style={styles.safeArea}>
            <EditProfileHeader theme={theme} styles={styles} />

            <KeyboardAvoidingView
              style={styles.keyboardAvoid}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              keyboardVerticalOffset={5}
            >
              <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                <ProfileAvatar userProfile={userProfile} theme={theme} />
                <ProfileReadOnlyFields
                  userProfile={userProfile}
                  theme={theme}
                />
                <ProfileForm
                  userProfile={userProfile}
                  theme={theme}
                  onSubmit={handleFormSubmit}
                  isPending={isPending}
                />
              </ScrollView>
            </KeyboardAvoidingView>

            <ProfileVerificationModal
              verificationModal={verificationModal}
              handleSendVerificationCode={handleSendVerificationCode}
              handleVerifyCode={handleVerifyCode}
              closeVerificationModal={closeVerificationModal}
              isPending={isPending}
            />
          </SafeAreaView>
        );
      }}
    </EditProfileContainer>
  );
}
