<template>
  <div class="insa-management">
    <v-container>
      <!-- 제목 섹션 -->
      <v-row class="header">
        <h1>인사관리</h1>
        <span class="header-info">인사정보를 관리할 수 있습니다.</span>
      </v-row>
    </v-container>

    <v-container>
      <!-- 검색 섹션 -->
      <!-- v-col cols="12"는 전체 가로 너비의 12/12, 즉 100%를 차지함을 의미. 
          Vuetify의 그리드 시스템은 12등분으로 나뉘어져 있어 
          cols="12"는 한 줄을 전부 차지 -->
      <v-row>
        <v-col cols="2">
          <v-select
            v-model="searchType"
            :items="searchTypes"
            label="검색 항목"
            class="search-select"
          ></v-select>
        </v-col>
        <v-col cols="7">
          <!-- append-icon: 입력 필드의 오른쪽에 아이콘을 추가,
            mdi-magnify: 확대경 아이콘 -->
          <v-text-field
            v-model="search"
            label="검색"
            append-icon="mdi-magnify"
            @click:append="performSearch"
          ></v-text-field>
        </v-col>
        <!-- 필터 섹션 -->
        <v-col cols="4">
          <!-- v-model="filter": Vue의 양방향 데이터 바인딩을 사용, 
           filter라는 데이터 속성과 연결. 
           사용자가 선택한 라디오 버튼의 값이 filter 변수에 저장 -->
          <v-radio-group v-model="filter" inline>
            <v-radio label="전체" value="전체"></v-radio>
            <v-radio label="재직" value="재직"></v-radio>
            <v-radio label="휴직" value="휴직"></v-radio>
            <v-radio label="퇴직" value="퇴직"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>

      <!-- 건수와 등록 버튼 : 테이블의 우측 상단에 건수와 버튼 배치 -->
      <v-row class="justify-end">
        <v-col cols="auto" class="d-flex align-center">
          <span>{{ employees.length }}건</span>
          <v-btn color="primary" class="ml-2" @click="openRegisterDialog"
            >등록</v-btn
          >
        </v-col>
      </v-row>

      <!-- 테이블 섹션 -->
      <v-row>
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="employees"
            :search="search"
            item-value="id"
            @click:row="selectEmployee"
            class="elevation-1"
          ></v-data-table>
        </v-col>
      </v-row>

      <!-- 등록 다이얼로그 -->
      <v-dialog v-model="registerDialog" max-width="800px">
        <v-card>
          <v-card-title>
            <span class="headline">인사 등록</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="3">
                  <v-text-field
                    v-model="newEmployee.id"
                    label="사용자ID"
                  ></v-text-field>
                </v-col>
                <v-col cols="1" class="d-flex align-center">
                  <v-btn @click="checkDuplicateId">중복확인</v-btn>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="newEmployee.name"
                    label="이름"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="newEmployee.birthDate"
                    label="생년월일"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  <v-select
                    v-model="newEmployee.department"
                    :items="['사업관리', '인사', '기술']"
                    label="부서"
                  ></v-select>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="newEmployee.email"
                    label="이메일"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-select
                    v-model="newEmployee.status"
                    :items="['재직', '휴직', '퇴직']"
                    label="상태"
                  ></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  <v-select
                    v-model="newEmployee.position"
                    :items="[
                      '사원',
                      '대리',
                      '팀장',
                      '차장',
                      '부장',
                      '이사',
                      '상무',
                    ]"
                    label="직위"
                  ></v-select>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="newEmployee.phone"
                    label="전화번호"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="newEmployee.joinDate"
                    label="입사일"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="newEmployee.address"
                    label="주소"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  <v-text-field
                    v-model="newEmployee.vacationDays"
                    label="휴가일수"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="newEmployee.remainingVacation"
                    label="잔여휴가일"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="newEmployee.tenure"
                    label="근속년수"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="closeRegisterDialog"
              >취소</v-btn
            >
            <v-btn color="blue darken-1" text @click="registerEmployee"
              >등록</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- 직원 상세 정보 섹션 -->
      <v-row v-if="selectedEmployee">
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <div class="d-flex justify-space-between align-center w-100">
                <span>직원 정보</span>
                <div>
                  <v-btn color="primary" class="mr-2" @click="save">저장</v-btn>
                  <v-btn color="red" @click="remove">삭제</v-btn>
                </div>
              </div>
            </v-card-title>

            <v-card-text>
              <v-row>
                <v-col cols="4">
                  <v-text-field
                    v-model="selectedEmployee.id"
                    label="사용자ID"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="selectedEmployee.name"
                    label="이름"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="selectedEmployee.birthDate"
                    label="생년월일"
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  <v-select
                    v-model="selectedEmployee.department"
                    :items="['사업관리', '인사', '기술']"
                    label="부서"
                    readonly
                  ></v-select>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="selectedEmployee.email"
                    label="이메일"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-select
                    v-model="selectedEmployee.status"
                    :items="['재직', '휴직', '퇴직']"
                    label="상태"
                    readonly
                  ></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  <v-select
                    v-model="selectedEmployee.position"
                    :items="[
                      '사원',
                      '대리',
                      '팀장',
                      '차장',
                      '부장',
                      '이사',
                      '상무',
                    ]"
                    label="직위"
                    readonly
                  ></v-select>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="selectedEmployee.phone"
                    label="전화번호"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="selectedEmployee.joinDate"
                    label="입사일"
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="selectedEmployee.address"
                    label="주소"
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  <v-text-field
                    v-model="selectedEmployee.vacationDays"
                    label="휴가일수"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="selectedEmployee.remainingVacation"
                    label="잔여휴가일"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="selectedEmployee.tenure"
                    label="근속년수"
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Insa",
  data() {
    return {
      searchType: "직원명",
      searchTypes: ["직원명", "직위", "소속", "근속년수"],
      search: "",
      filter: "전체",
      employees: [
        {
          id: "cynam",
          name: "남채윤",
          department: "사업관리",
          position: "보좌관",
          email: "cyan@creditf.co.kr",
          status: "재직",
          tenure: "1년",
          joinDate: "2014-12-26",

          birthDate: "2011-04-02",
          phone: "010-5710-0703",
          address: "서울 중구 퇴계로 187(필동1가, 국제빌딩) 607호",
          vacationDays: 15,
          remainingVacation: 11,
        },
        {
          id: "yjgo",
          name: "고영중",
          department: "사업관리",
          position: "고문",
          email: "yjgo@creditf.co.kr",
          status: "재직",
          tenure: "1년",
          joinDate: "2014-12-26",

          birthDate: "2011-04-02",
          phone: "010-5710-0703",
          address: "서울 중구 퇴계로 187(필동1가, 국제빌딩) 607호",
          vacationDays: 15,
          remainingVacation: 11,
        },
        {
          id: "jhkim",
          name: "김준혁",
          department: "사업관리",
          position: "고문",
          email: "jhkim@creditf.co.kr",
          status: "재직",
          tenure: "1년",
          joinDate: "2014-12-26",

          birthDate: "2011-04-02",
          phone: "010-5710-0703",
          address: "서울 중구 퇴계로 187(필동1가, 국제빌딩) 607호",
          vacationDays: 15,
          remainingVacation: 11,
        },
        {
          id: "okdol",
          name: "조옥현",
          department: "사업관리",
          position: "상무",
          email: "okdol@creditf.co.kr",
          status: "재직",
          tenure: "1년",
          joinDate: "2014-12-26",

          birthDate: "2011-04-02",
          phone: "010-5710-0703",
          address: "서울 중구 퇴계로 187(필동1가, 국제빌딩) 607호",
          vacationDays: 15,
          remainingVacation: 11,
        },
        {
          id: "jjlee",
          name: "이재준",
          department: "사업관리",
          position: "상무",
          email: "jjlee@creditf.co.kr",
          status: "재직",
          tenure: "4년",
          joinDate: "2014-12-26",

          birthDate: "2011-04-02",
          phone: "010-5710-0703",
          address: "서울 중구 퇴계로 187(필동1가, 국제빌딩) 607호",
          vacationDays: 15,
          remainingVacation: 11,
        },
      ],
      selectedEmployee: null,
      registerDialog: false,
      newEmployee: {
        id: "",
        name: "",
        department: "",
        position: "",
        email: "",
        status: "",
        tenure: "",
        joinDate: "",

        birthDate: "",
        phone: "",
        address: "",
        vacationDays: "",
        remainingVacation: "",
      },
      headers: [
        // value값을 테이블에 들어갈 데이터 배열의 키와 대응시켜야!
        { title: "사용자ID", value: "id" },
        { title: "이름", value: "name" },
        { title: "부서", value: "department" },
        { title: "직위", value: "position" },
        { title: "이메일", value: "email" },
        { title: "상태", value: "status" },
        { title: "근속년수", value: "tenure" },
        { title: "입사일", value: "joinDate" },
      ],
    };
  },
  methods: {
    selectEmployee(item) {
      this.selectedEmployee = item;
    },
    openRegisterDialog() {
      this.registerDialog = true;
    },
    closeRegisterDialog() {
      this.registerDialog = false;
    },
    checkDuplicateId() {
      // ID 중복 확인 로직 추가
      // 예를 들어, 서버에 요청을 보내서 중복 여부 확인
      alert("중복 확인 기능은 아직 구현되지 않았습니다.");
    },
    registerEmployee() {
      // 새로운 직원 등록 로직 추가
      this.employees.push({ ...this.newEmployee });
      this.closeRegisterDialog();
    },
    save() {
      alert("저장 버튼 클릭");
    },
    remove() {
      if (confirm("삭제하시겠습니까?")) {
        const index = this.employees.findIndex(
          (e) => e.id === this.selectedEmployee.id
        );
        if (index !== -1) {
          this.employees.splice(index, 1);
          this.selectedEmployee = null;
        }
      }
    },
    performSearch() {
      // this는 현재 Vue 컴포넌트 인스턴스이므로
      // this.search는 Vue 컴포넌트의 data 함수에서 정의된 데이터 속성 중 하나를 참조
      console.log("Searching for:", this.search);
    },
  },
};
</script>

<style scoped>
.header {
  margin-top: 30px;
  margin-bottom: 20px;
}
h1 {
}
span.header-info {
  color: gray;
  display: inline-block;
  margin-left: 20px; /* 제목과의 간격 */
  margin-top: 20px; /* 텍스트 높이를 아래로 조정 */
  font-size: 0.9rem;
}

.radio-group {
  border: 1px solid;
}

.v-data-table {
  margin-top: 0px;
}
.text-right {
  text-align: right;
}
.child-item {
  font-size: 0.875rem; /* 글씨 크기를 작게 설정 */
  padding-left: 32px; /* 들여쓰기 */
}
</style>
