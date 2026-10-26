
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type LanguageType = 'english' | 'hindi' | 'marathi';

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
  translations: Record<string, Record<string, string>>;
  t: (key: string) => string;
}

const translations = {
  english: {
    // Common
    "select_language": "Select Language",
    "login": "Login",
    "admin_login": "Admin Login",
    "voter_login": "Voter Login",
    "phone_number": "Phone Number",
    "enter_phone": "Enter your phone number",
    "send_otp": "Send Verification Code",
    "verification_code": "Verification Code",
    "verify_login": "Verify & Login",
    "back_to_phone": "Back to Phone Entry",
    "otp_sent": "A verification code has been sent to",
    "invalid_otp": "The verification code you entered is incorrect",
    "login_success": "Login successful!",
    "aadhaar_number": "Aadhaar Number",
    "enter_aadhaar": "Enter your 12-digit Aadhaar number",
    "testing_note": "For testing:",
    "home": "Home",
    
    // Admin Dashboard
    "admin_dashboard": "Admin Dashboard",
    "start_election": "Start Election",
    "stop_election": "Stop Election",
    "election_in_progress": "Election in Progress",
    "election_not_started": "Election Not Started",
    "ongoing_elections": "Ongoing Elections",
    "political_parties": "Political Parties",
    "candidates": "Candidates",
    "voters": "Voters",
    "total_votes": "Total Votes",
    "voter_turnout": "Voter Turnout",
    "constituency": "Constituency",
    "current_status": "Current Status",
    "party_wise_votes": "Party-wise Votes",
    "recent_voting_activity": "Recent Voting Activity",
    "charts_and_stats": "Charts and Stats",
    "recent_activity": "Recent Activity",
    "active": "Active",
    "upcoming": "Upcoming",
    "completed": "Completed",
    "unknown_voter": "Unknown Voter",
    "unknown_candidate": "Unknown Candidate",
    "unknown_party": "Unknown Party",
    "voted_for": "voted for",
    "no_voting_activity": "No voting activity yet.",
    
    // Voter Dashboard
    "voter_dashboard": "Voter Dashboard",
    "cast_vote": "Cast Vote",
    "select_candidate": "Select the candidate you want to vote for",
    "casting_vote": "Casting Vote...",
    "vote_cast_success": "Vote cast successfully",
    "already_voted": "You have already voted",
    "election_not_active": "The election has not started yet",
    "wait_for_admin": "Please wait for the administrator to start the election.",
    "each_voter_once": "Each voter is only allowed to vote once.",
    "selected": "Selected",
    "voting_info": "Voting Information",
    "view_results": "View Results",
    "how_to_vote": "How to Vote",
    "your_vote": "Your Vote",
    
    // Political Parties Page
    "manage_parties": "Manage Parties",
    "add_party": "Add Party",
    "party_name": "Party Name",
    "party_symbol": "Party Symbol",
    "party_description": "Party Description",
    "edit_party": "Edit Party",
    "delete_party": "Delete Party",
    "confirm_delete_party": "Are you sure you want to delete this party?",
    "party_added": "Party added successfully",
    "party_updated": "Party updated successfully",
    "party_deleted": "Party deleted successfully",
    
    // Candidates Page
    "manage_candidates": "Manage Candidates",
    "add_candidate": "Add Candidate",
    "candidate_name": "Candidate Name",
    "candidate_party": "Candidate Party",
    "candidate_profile": "Candidate Profile",
    "edit_candidate": "Edit Candidate",
    "delete_candidate": "Delete Candidate",
    "confirm_delete_candidate": "Are you sure you want to delete this candidate?",
    "candidate_added": "Candidate added successfully",
    "candidate_updated": "Candidate updated successfully",
    "candidate_deleted": "Candidate deleted successfully",
    "select_party": "Select Party",
    
    // Voters Page
    "manage_voters": "Manage Voters",
    "add_voter": "Add Voter",
    "voter_name": "Voter Name",
    "voter_aadhaar": "Voter Aadhaar",
    "voter_status": "Voter Status",
    "has_voted": "Has Voted",
    "not_voted": "Not Voted",
    "edit_voter": "Edit Voter",
    "delete_voter": "Delete Voter",
    "confirm_delete_voter": "Are you sure you want to delete this voter?",
    "voter_added": "Voter added successfully",
    "voter_updated": "Voter updated successfully",
    "voter_deleted": "Voter deleted successfully",
    
    // Election Results Page
    "election_results": "Election Results",
    "result_by_party": "Results by Party",
    "result_by_candidate": "Results by Candidate",
    "total_votes_cast": "Total Votes Cast",
    "votes_received": "Votes Received",
    "percentage": "Percentage",
    "vote_breakdown": "Vote Breakdown",
    "winner": "Winner",
    "download_results": "Download Results",
    
    // Cast Vote Page
    "vote_confirmation": "Vote Confirmation",
    "confirm_vote": "Confirm your vote",
    "vote_for": "Vote for",
    "confirm": "Confirm",
    "cancel": "Cancel",
    "vote_processing": "Processing your vote...",
    "vote_recorded": "Your vote has been recorded",
    "thank_you": "Thank you for voting",
    "return_to_dashboard": "Return to Dashboard"
  },
  hindi: {
    // Common
    "select_language": "भाषा चुनें",
    "login": "लॉगिन",
    "admin_login": "प्रशासक लॉगिन",
    "voter_login": "मतदाता लॉगिन",
    "phone_number": "फोन नंबर",
    "enter_phone": "अपना फोन नंबर दर्ज करें",
    "send_otp": "सत्यापन कोड भेजें",
    "verification_code": "सत्यापन कोड",
    "verify_login": "सत्यापित करें और लॉगिन करें",
    "back_to_phone": "फोन नंबर पर वापस जाएं",
    "otp_sent": "सत्यापन कोड भेज दिया गया है",
    "invalid_otp": "आपका दर्ज किया गया सत्यापन कोड गलत है",
    "login_success": "लॉगिन सफल!",
    "aadhaar_number": "आधार नंबर",
    "enter_aadhaar": "अपना 12 अंकों का आधार नंबर दर्ज करें",
    "testing_note": "परीक्षण के लिए:",
    "home": "होम",
    
    // Admin Dashboard
    "admin_dashboard": "प्रशासक डैशबोर्ड",
    "start_election": "मतदान शुरू करें",
    "stop_election": "मतदान बंद करें",
    "election_in_progress": "मतदान प्रगति पर है",
    "election_not_started": "मतदान शुरू नहीं हुआ है",
    "ongoing_elections": "चल रहे चुनाव",
    "political_parties": "राजनीतिक दल",
    "candidates": "उम्मीदवार",
    "voters": "मतदाता",
    "total_votes": "कुल वोट",
    "voter_turnout": "मतदाता भागीदारी",
    "constituency": "निर्वाचन क्षेत्र",
    "current_status": "वर्तमान स्थिति",
    "party_wise_votes": "दल-वार वोट",
    "recent_voting_activity": "हाल की मतदान गतिविधि",
    "charts_and_stats": "चार्ट और आंकड़े",
    "recent_activity": "हाल की गतिविधि",
    "active": "सक्रिय",
    "upcoming": "आगामी",
    "completed": "पूर्ण",
    "unknown_voter": "अज्ञात मतदाता",
    "unknown_candidate": "अज्ञात उम्मीदवार",
    "unknown_party": "अज्ञात दल",
    "voted_for": "ने वोट दिया",
    "no_voting_activity": "अभी तक कोई मतदान गतिविधि नहीं.",
    
    // Voter Dashboard
    "voter_dashboard": "मतदाता डैशबोर्ड",
    "cast_vote": "वोट डालें",
    "select_candidate": "जिस उम्मीदवार को आप वोट देना चाहते हैं उसे चुनें",
    "casting_vote": "वोट डाला जा रहा है...",
    "vote_cast_success": "वोट सफलतापूर्वक डाला गया",
    "already_voted": "आपने पहले ही वोट दिया है",
    "election_not_active": "चुनाव अभी शुरू नहीं हुआ है",
    "wait_for_admin": "कृपया प्रशासक द्वारा चुनाव शुरू करने की प्रतीक्षा करें.",
    "each_voter_once": "प्रत्येक मतदाता को केवल एक बार ही वोट देने की अनुमति है.",
    "selected": "चयनित",
    "voting_info": "मतदान जानकारी",
    "view_results": "परिणाम देखें",
    "how_to_vote": "वोट कैसे दें",
    "your_vote": "आपका वोट",
    
    // Political Parties Page
    "manage_parties": "दलों का प्रबंधन करें",
    "add_party": "दल जोड़ें",
    "party_name": "दल का नाम",
    "party_symbol": "दल का प्रतीक",
    "party_description": "दल का विवरण",
    "edit_party": "दल संपादित करें",
    "delete_party": "दल हटाएं",
    "confirm_delete_party": "क्या आप वाकई इस दल को हटाना चाहते हैं?",
    "party_added": "दल सफलतापूर्वक जोड़ा गया",
    "party_updated": "दल सफलतापूर्वक अपडेट किया गया",
    "party_deleted": "दल सफलतापूर्वक हटा दिया गया",
    
    // Candidates Page
    "manage_candidates": "उम्मीदवारों का प्रबंधन करें",
    "add_candidate": "उम्मीदवार जोड़ें",
    "candidate_name": "उम्मीदवार का नाम",
    "candidate_party": "उम्मीदवार का दल",
    "candidate_profile": "उम्मीदवार का प्रोफ़ाइल",
    "edit_candidate": "उम्मीदवार संपादित करें",
    "delete_candidate": "उम्मीदवार हटाएं",
    "confirm_delete_candidate": "क्या आप वाकई इस उम्मीदवार को हटाना चाहते हैं?",
    "candidate_added": "उम्मीदवार सफलतापूर्वक जोड़ा गया",
    "candidate_updated": "उम्मीदवार सफलतापूर्वक अपडेट किया गया",
    "candidate_deleted": "उम्मीदवार सफलतापूर्वक हटा दिया गया",
    "select_party": "दल चुनें",
    
    // Voters Page
    "manage_voters": "मतदाताओं का प्रबंधन करें",
    "add_voter": "मतदाता जोड़ें",
    "voter_name": "मतदाता का नाम",
    "voter_aadhaar": "मतदाता का आधार",
    "voter_status": "मतदाता की स्थिति",
    "has_voted": "मतदान किया है",
    "not_voted": "मतदान नहीं किया है",
    "edit_voter": "मतदाता संपादित करें",
    "delete_voter": "मतदाता हटाएं",
    "confirm_delete_voter": "क्या आप वाकई इस मतदाता को हटाना चाहते हैं?",
    "voter_added": "मतदाता सफलतापूर्वक जोड़ा गया",
    "voter_updated": "मतदाता सफलतापूर्वक अपडेट किया गया",
    "voter_deleted": "मतदाता सफलतापूर्वक हटा दिया गया",
    
    // Election Results Page
    "election_results": "चुनाव परिणाम",
    "result_by_party": "दल के अनुसार परिणाम",
    "result_by_candidate": "उम्मीदवार के अनुसार परिणाम",
    "total_votes_cast": "डाले गए कुल वोट",
    "votes_received": "प्राप्त वोट",
    "percentage": "प्रतिशत",
    "vote_breakdown": "वोट का विश्लेषण",
    "winner": "विजेता",
    "download_results": "परिणाम डाउनलोड करें",
    
    // Cast Vote Page
    "vote_confirmation": "वोट की पुष्टि",
    "confirm_vote": "अपने वोट की पुष्टि करें",
    "vote_for": "इन्हें वोट दें",
    "confirm": "पुष्टि करें",
    "cancel": "रद्द करें",
    "vote_processing": "आपका वोट संसाधित किया जा रहा है...",
    "vote_recorded": "आपका वोट दर्ज कर लिया गया है",
    "thank_you": "मतदान के लिए धन्यवाद",
    "return_to_dashboard": "डैशबोर्ड पर वापस जाएं"
  },
  marathi: {
    // Common
    "select_language": "भाषा निवडा",
    "login": "लॉगिन",
    "admin_login": "प्रशासक लॉगिन",
    "voter_login": "मतदार लॉगिन",
    "phone_number": "फोन नंबर",
    "enter_phone": "आपला फोन नंबर टाका",
    "send_otp": "सत्यापन कोड पाठवा",
    "verification_code": "सत्यापन कोड",
    "verify_login": "सत्यापित करा आणि लॉगिन करा",
    "back_to_phone": "फोन नंबर पृष्ठावर परत जा",
    "otp_sent": "सत्यापन कोड पाठवला गेला आहे",
    "invalid_otp": "आपण प्रविष्ट केलेला सत्यापन कोड चुकीचा आहे",
    "login_success": "लॉगिन यशस्वी!",
    "aadhaar_number": "आधार क्रमांक",
    "enter_aadhaar": "आपला 12 अंकी आधार क्रमांक टाका",
    "testing_note": "चाचणीसाठी:",
    "home": "होम",
    
    // Admin Dashboard
    "admin_dashboard": "प्रशासक डॅशबोर्ड",
    "start_election": "निवडणूक सुरू करा",
    "stop_election": "निवडणूक थांबवा",
    "election_in_progress": "निवडणूक प्रगतीपथावर आहे",
    "election_not_started": "निवडणूक अद्याप सुरू झाली नाही",
    "ongoing_elections": "चालू निवडणुका",
    "political_parties": "राजकीय पक्ष",
    "candidates": "उमेदवार",
    "voters": "मतदार",
    "total_votes": "एकूण मते",
    "voter_turnout": "मतदार उपस्थिती",
    "constituency": "मतदारसंघ",
    "current_status": "सध्याची स्थिती",
    "party_wise_votes": "पक्षनिहाय मते",
    "recent_voting_activity": "अलीकडील मतदान क्रियाकलाप",
    "charts_and_stats": "तक्ते आणि आकडेवारी",
    "recent_activity": "अलीकडील क्रियाकलाप",
    "active": "सक्रिय",
    "upcoming": "आगामी",
    "completed": "पूर्ण",
    "unknown_voter": "अज्ञात मतदार",
    "unknown_candidate": "अज्ञात उमेदवार",
    "unknown_party": "अज्ञात पक्ष",
    "voted_for": "यांना मत दिले",
    "no_voting_activity": "अद्याप कोणतीही मतदान क्रियाकलाप नाही.",
    
    // Voter Dashboard
    "voter_dashboard": "मतदार डॅशबोर्ड",
    "cast_vote": "मतदान करा",
    "select_candidate": "आपण ज्या उमेदवाराला मतदान करू इच्छिता त्याची निवड करा",
    "casting_vote": "मतदान केले जात आहे...",
    "vote_cast_success": "मतदान यशस्वीरित्या केले",
    "already_voted": "आपण आधीच मतदान केले आहे",
    "election_not_active": "निवडणूक अद्याप सुरू झालेली नाही",
    "wait_for_admin": "कृपया प्रशासकाने निवडणूक सुरू करण्याची प्रतीक्षा करा.",
    "each_voter_once": "प्रत्येक मतदाराला फक्त एकदाच मतदान करण्याची परवानगी आहे.",
    "selected": "निवडलेले",
    "voting_info": "मतदान माहिती",
    "view_results": "निकाल पहा",
    "how_to_vote": "मतदान कसे करावे",
    "your_vote": "तुमचे मतदान",
    
    // Political Parties Page
    "manage_parties": "पक्षांचे व्यवस्थापन करा",
    "add_party": "पक्ष जोडा",
    "party_name": "पक्षाचे नाव",
    "party_symbol": "पक्षाचे चिन्ह",
    "party_description": "पक्षाचे वर्णन",
    "edit_party": "पक्ष संपादित करा",
    "delete_party": "पक्ष हटवा",
    "confirm_delete_party": "तुम्हाला खात्री आहे की तुम्ही हा पक्ष हटवू इच्छिता?",
    "party_added": "पक्ष यशस्वीरित्या जोडला गेला",
    "party_updated": "पक्ष यशस्वीरित्या अपडेट केला गेला",
    "party_deleted": "पक्ष यशस्वीरित्या हटविला गेला",
    
    // Candidates Page
    "manage_candidates": "उमेदवारांचे व्यवस्थापन करा",
    "add_candidate": "उमेदवार जोडा",
    "candidate_name": "उमेदवाराचे नाव",
    "candidate_party": "उमेदवाराचा पक्ष",
    "candidate_profile": "उमेदवाराचे प्रोफाइल",
    "edit_candidate": "उमेदवार संपादित करा",
    "delete_candidate": "उमेदवार हटवा",
    "confirm_delete_candidate": "तुम्हाला खात्री आहे की तुम्ही हा उमेदवार हटवू इच्छिता?",
    "candidate_added": "उमेदवार यशस्वीरित्या जोडला गेला",
    "candidate_updated": "उमेदवार यशस्वीरित्या अपडेट केला गेला",
    "candidate_deleted": "उमेदवार यशस्वीरित्या हटविला गेला",
    "select_party": "पक्ष निवडा",
    
    // Voters Page
    "manage_voters": "मतदारांचे व्यवस्थापन करा",
    "add_voter": "मतदार जोडा",
    "voter_name": "मतदाराचे नाव",
    "voter_aadhaar": "मतदाराचा आधार",
    "voter_status": "मतदाराची स्थिती",
    "has_voted": "मतदान केले आहे",
    "not_voted": "मतदान केले नाही",
    "edit_voter": "मतदार संपादित करा",
    "delete_voter": "मतदार हटवा",
    "confirm_delete_voter": "तुम्हाला खात्री आहे की तुम्ही हा मतदार हटवू इच्छिता?",
    "voter_added": "मतदार यशस्वीरित्या जोडला गेला",
    "voter_updated": "मतदार यशस्वीरित्या अपडेट केला गेला",
    "voter_deleted": "मतदार यशस्वीरित्या हटविला गेला",
    
    // Election Results Page
    "election_results": "निवडणूक निकाल",
    "result_by_party": "पक्षानुसार निकाल",
    "result_by_candidate": "उमेदवारानुसार निकाल",
    "total_votes_cast": "एकूण टाकलेली मते",
    "votes_received": "प्राप्त मते",
    "percentage": "टक्केवारी",
    "vote_breakdown": "मतांचे विश्लेषण",
    "winner": "विजेता",
    "download_results": "निकाल डाउनलोड करा",
    
    // Cast Vote Page
    "vote_confirmation": "मतदान पुष्टीकरण",
    "confirm_vote": "आपले मतदान पुष्टी करा",
    "vote_for": "यांना मतदान करा",
    "confirm": "पुष्टी करा",
    "cancel": "रद्द करा",
    "vote_processing": "आपले मतदान प्रक्रिया होत आहे...",
    "vote_recorded": "आपले मतदान नोंदविले गेले आहे",
    "thank_you": "मतदान केल्याबद्दल धन्यवाद",
    "return_to_dashboard": "डॅशबोर्डवर परत जा"
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'english',
  setLanguage: () => {},
  translations,
  t: () => '',
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageType>(() => {
    // Try to get saved language from localStorage
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as LanguageType) || 'english';
  });

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (newLanguage: LanguageType) => {
    setLanguageState(newLanguage);
  };

  // Translate function
  const t = (key: string) => {
    return translations[language][key] || translations.english[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
