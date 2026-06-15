import { ScrollView, RefreshControl } from "react-native";
import CourseLister from "../../../components/feedback/CourseLister";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../../assets/MziuriLogo.svg";
import { FeedbackFormModal } from "../../../components/feedback/FeedbackFormModal";
import { ChangeFeedbackConfirmationModal } from "../../../components/feedback/ChangeFeedbackConfirmationModal";
import { FeedbackContainer } from "../../../components/feedback/FeedbackContainer";

const feedback = () => {
  return (
    <FeedbackContainer>
      {({ state, setters, handlers, styles }) => {
        const {
          refreshing,
          selectedFeedback,
          showFeedbackForm,
          selectedCourseName,
          selectedGroupId,
          showChangeConfirm,
          pendingFeedbackPress,
          courses,
        } = state;

        const {
          setShowChangeConfirm,
          setSelectedCourseName,
          setSelectedGroupId,
          setSelectedFeedback,
          setShowFeedbackForm,
          setPendingFeedbackPress,
        } = setters;

        const { onRefresh, handleFeedbackPress, handleCloseFeedbackForm } =
          handlers;

        return (
          <SafeAreaView style={styles.container}>
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              <Logo style={styles.logo} />
              <CourseLister
                data={courses}
                onFeedbackPress={handleFeedbackPress}
              />
            </ScrollView>

            <FeedbackFormModal
              visible={showFeedbackForm}
              courseName={selectedCourseName}
              groupId={selectedGroupId}
              existingFeedback={selectedFeedback}
              onClose={handleCloseFeedbackForm}
            />

            <ChangeFeedbackConfirmationModal
              visible={showChangeConfirm}
              onConfirm={() => {
                setShowChangeConfirm(false);
                if (pendingFeedbackPress) {
                  setSelectedCourseName(pendingFeedbackPress.courseName);
                  setSelectedGroupId(pendingFeedbackPress.groupId);
                  setSelectedFeedback(pendingFeedbackPress.existingFeedback);
                }
                setShowFeedbackForm(true);
                setPendingFeedbackPress(null);
              }}
              onCancel={() => {
                setShowChangeConfirm(false);
                setPendingFeedbackPress(null);
              }}
            />
          </SafeAreaView>
        );
      }}
    </FeedbackContainer>
  );
};

export default feedback;
