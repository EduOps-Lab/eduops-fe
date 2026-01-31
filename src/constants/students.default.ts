import {
  AttendanceRegisterFormData,
  ClassChangeFormData,
  EditProfileFormData,
  StudentCreateFormData,
} from "@/types/students.type";
import { getTodayISODate, getTodayYMD } from "@/utils/date";

// select 버튼 options
export const GRADE_SELECTING_OPTIONS = [
  { label: "고3", value: "고3" },
  { label: "고2", value: "고2" },
  { label: "고1", value: "고1" },
  { label: "중3", value: "중3" },
  { label: "중2", value: "중2" },
  { label: "중1", value: "중1" },
];

export const GRADE_SELECT_OPTIONS = [
  { label: "전체 학년", value: "all" },
  ...GRADE_SELECTING_OPTIONS,
];

export const STATUS_SETTING_OPTIONS = [
  { label: "재원", value: "ACTIVE" },
  { label: "휴원", value: "PAUSED" },
  { label: "퇴원", value: "DROPPED" },
];

// 수강생 상태 매핑 객체(테이블 렌더링용)
export const STUDENT_STATUS_LABEL = {
  ACTIVE: "재원",
  DROPPED: "퇴원",
  PAUSED: "휴원",
};

export const STATUS_SELECT_OPTIONS = [
  { label: "전체 상태", value: "all" },
  ...STATUS_SETTING_OPTIONS,
];

export const STUDENTS_TABLE_COLUMNS = [
  { key: "profile", label: "프로필" },
  { key: "name", label: "학생명" },
  { key: "status", label: "재원상태" },
  { key: "appInstalled", label: "앱 설치" },
  { key: "class", label: "클래스" },
  { key: "school", label: "학교/학년" },
  { key: "phoneNumber", label: "연락처" },
  { key: "registeredAt", label: "등록일" },
  { key: "attendance", label: "출석현황" },
  { key: "statusSelect", label: "상태" },
];

export const ATTENDANCE_STATUS_OPTIONS = [
  { label: "출석", value: "PRESENT" },
  { label: "결석", value: "ABSENT" },
  { label: "조퇴", value: "EARLY_LEAVE" },
  { label: "지각", value: "LATE" },
];

export const getCreateStudentFormDefaults = (): StudentCreateFormData => {
  return {
    name: "",
    phoneNumber: "",
    school: "",
    schoolYear: "",
    parentPhone: "",
    assignedClass: "",
    registrationDate: getTodayYMD(),
    memo: "",
  };
};

export const CLASS_CHANGE_FORM_DEFAULTS: ClassChangeFormData = {
  assignedClass: "",
  memo: "",
};

export const EDIT_PROFILE_FORM_DEFAULTS: EditProfileFormData = {
  name: "",
  school: "",
  schoolYear: "",
  phoneNumber: "",
  email: "",
  parentPhone: "",
};

export const getAttendanceRegisterFormDefaults =
  (): AttendanceRegisterFormData => {
    return {
      date: getTodayISODate(),
      status: "",
      memo: "",
    };
  };
