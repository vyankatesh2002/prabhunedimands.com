     document.addEventListener('DOMContentLoaded', function() {
            // DOM Elements
            const bookingForm = document.getElementById('bookingForm');
            const successMessage = document.getElementById('successMessage');
            const closeSuccessBtn = document.getElementById('closeSuccessBtn');
            
            // Step Elements
            const steps = document.querySelectorAll('.step');
            const sections = document.querySelectorAll('.form-section');
            
            // Navigation Buttons
            const nextToStep2Btn = document.getElementById('nextToStep2');
            const nextToStep3Btn = document.getElementById('nextToStep3');
            const backToStep1Btn = document.getElementById('backToStep1');
            const backToStep2Btn = document.getElementById('backToStep2');
            const submitBookingBtn = document.getElementById('submitBooking');
            
            // Form Fields
            const fullNameInput = document.getElementById('fullName');
            const phoneInput = document.getElementById('phone');
            const emailInput = document.getElementById('email');
            const serviceSelect = document.getElementById('service');
            const notesInput = document.getElementById('notes');
            const bookingDateInput = document.getElementById('bookingDate');
            const bookingTimeSelect = document.getElementById('bookingTime');
            const confirmationNotesInput = document.getElementById('confirmationNotes');
            
            // Review Elements
            const reviewName = document.getElementById('reviewName');
            const reviewPhone = document.getElementById('reviewPhone');
            const reviewEmail = document.getElementById('reviewEmail');
            const reviewService = document.getElementById('reviewService');
            const reviewDate = document.getElementById('reviewDate');
            const reviewTime = document.getElementById('reviewTime');
            
            // Calendar Elements
            const calendarContainer = document.getElementById('calendarContainer');
            const calendarGrid = document.getElementById('calendarGrid');
            const currentMonthEl = document.getElementById('currentMonth');
            const prevMonthBtn = document.getElementById('prevMonth');
            const nextMonthBtn = document.getElementById('nextMonth');
            const timeSlotsContainer = document.getElementById('timeSlots');
            
            // Variables
            let currentStep = 1;
            let selectedDate = null;
            let selectedTime = null;
            let currentMonth = new Date().getMonth();
            let currentYear = new Date().getFullYear();
            
            // Initialize
            initDateInput();
            generateCalendar();
            generateTimeSlots();
            
            // Set minimum date to today
            function initDateInput() {
                const today = new Date();
                const tomorrow = new Date(today);
                tomorrow.setDate(tomorrow.getDate() + 1);
                
                const formattedDate = tomorrow.toISOString().split('T')[0];
                bookingDateInput.min = formattedDate;
                
                // Set default to tomorrow
                bookingDateInput.value = formattedDate;
                selectedDate = formattedDate;
                updateSelectedDateInCalendar();
            }
            
            // Calendar Generation
            function generateCalendar() {
                // Clear previous calendar
                calendarGrid.innerHTML = '';
                
                // Month names
                const monthNames = [
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];
                
                // Update month display
                currentMonthEl.textContent = `${monthNames[currentMonth]} ${currentYear}`;
                
                // Add weekday headers
                const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                weekdays.forEach(day => {
                    const dayEl = document.createElement('div');
                    dayEl.className = 'calendar-day weekday';
                    dayEl.textContent = day;
                    calendarGrid.appendChild(dayEl);
                });
                
                // Get first day of the month
                const firstDay = new Date(currentYear, currentMonth, 1);
                const startingDay = firstDay.getDay();
                
                // Get days in the month
                const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
                
                // Get today's date
                const today = new Date();
                const currentDay = today.getDate();
                const currentMonthIndex = today.getMonth();
                const currentYearNum = today.getFullYear();
                
                // Add empty cells for days before the first day of the month
                for (let i = 0; i < startingDay; i++) {
                    const emptyDay = document.createElement('div');
                    emptyDay.className = 'calendar-day';
                    calendarGrid.appendChild(emptyDay);
                }
                
                // Add days of the month
                for (let day = 1; day <= daysInMonth; day++) {
                    const dayEl = document.createElement('div');
                    dayEl.className = 'calendar-day available';
                    dayEl.textContent = day;
                    dayEl.dataset.date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    
                    // Check if this date is in the past
                    const isPastDate = (currentYear < currentYearNum) || 
                                     (currentYear === currentYearNum && currentMonth < currentMonthIndex) ||
                                     (currentYear === currentYearNum && currentMonth === currentMonthIndex && day < currentDay);
                    
                    // Mark weekends as unavailable
                    const dayOfWeek = new Date(currentYear, currentMonth, day).getDay();
                    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                    
                    // Mark some random days as unavailable for demo
                    const isUnavailable = Math.random() < 0.2;
                    
                    if (isPastDate || isUnavailable) {
                        dayEl.classList.remove('available');
                        dayEl.classList.add('unavailable');
                        dayEl.style.cursor = 'not-allowed';
                    } else if (isWeekend) {
                        dayEl.classList.add('weekend');
                    }
                    
                    // Check if this is the selected date
                    if (selectedDate && dayEl.dataset.date === selectedDate) {
                        dayEl.classList.add('selected');
                    }
                    
                    // Add click event
                    if (!isPastDate && !isUnavailable) {
                        dayEl.addEventListener('click', function() {
                            selectDate(this.dataset.date);
                        });
                    }
                    
                    calendarGrid.appendChild(dayEl);
                }
            }
            
            // Time Slots Generation
            function generateTimeSlots() {
                // Clear previous time slots
                timeSlotsContainer.innerHTML = '';
                bookingTimeSelect.innerHTML = '<option value="">Select a time slot</option>';
                
                // Time slots (9 AM to 5 PM with 30 min intervals)
                const timeSlots = [
                    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
                    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
                    "15:00", "15:30", "16:00", "16:30", "17:00"
                ];
                
                // Mark some random time slots as unavailable
                timeSlots.forEach(time => {
                    const isUnavailable = Math.random() < 0.3;
                    
                    // Create select option
                    const option = document.createElement('option');
                    option.value = time;
                    option.textContent = time;
                    if (isUnavailable) {
                        option.disabled = true;
                        option.textContent += " (Unavailable)";
                    }
                    bookingTimeSelect.appendChild(option);
                    
                    // Create time slot button
                    const timeSlotEl = document.createElement('div');
                    timeSlotEl.className = `time-slot ${isUnavailable ? 'unavailable' : 'available'}`;
                    timeSlotEl.textContent = time;
                    timeSlotEl.dataset.time = time;
                    
                    if (!isUnavailable) {
                        timeSlotEl.addEventListener('click', function() {
                            selectTime(this.dataset.time);
                        });
                    }
                    
                    timeSlotsContainer.appendChild(timeSlotEl);
                });
            }
            
            // Date Selection
            function selectDate(date) {
                selectedDate = date;
                
                // Update calendar selection
                document.querySelectorAll('.calendar-day.selected').forEach(el => {
                    el.classList.remove('selected');
                });
                
                document.querySelector(`.calendar-day[data-date="${date}"]`).classList.add('selected');
                
                // Update date input
                bookingDateInput.value = date;
                
                // Generate new time slots for selected date
                generateTimeSlots();
                selectedTime = null;
                bookingTimeSelect.value = "";
            }
            
            // Time Selection
            function selectTime(time) {
                selectedTime = time;
                
                // Update time slot selection
                document.querySelectorAll('.time-slot.selected').forEach(el => {
                    el.classList.remove('selected');
                });
                
                document.querySelector(`.time-slot[data-time="${time}"]`).classList.add('selected');
                
                // Update time select
                bookingTimeSelect.value = time;
            }
            
            // Update selected date in calendar
            function updateSelectedDateInCalendar() {
                if (selectedDate) {
                    document.querySelectorAll('.calendar-day.selected').forEach(el => {
                        el.classList.remove('selected');
                    });
                    
                    const selectedDay = document.querySelector(`.calendar-day[data-date="${selectedDate}"]`);
                    if (selectedDay) {
                        selectedDay.classList.add('selected');
                    }
                }
            }
            
            // Step Navigation
            function goToStep(step) {
                // Hide all sections
                sections.forEach(section => {
                    section.classList.remove('active');
                });
                
                // Remove active class from all steps
                steps.forEach(stepEl => {
                    stepEl.classList.remove('active');
                });
                
                // Mark previous steps as completed
                for (let i = 0; i < step; i++) {
                    steps[i].classList.add('completed');
                }
                
                // Show current section and mark step as active
                document.getElementById(`section${step}`).classList.add('active');
                steps[step - 1].classList.add('active');
                
                currentStep = step;
                
                // Update review section if going to step 3
                if (step === 3) {
                    updateReviewSection();
                }
            }
            
            // Update Review Section
            function updateReviewSection() {
                reviewName.textContent = fullNameInput.value || '-';
                reviewPhone.textContent = phoneInput.value || '-';
                reviewEmail.textContent = emailInput.value || '-';
                
                // Get service display text
                const serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;
                reviewService.textContent = serviceText || '-';
                
                // Format date
                if (selectedDate) {
                    const dateObj = new Date(selectedDate);
                    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                    reviewDate.textContent = dateObj.toLocaleDateString('en-US', options);
                } else {
                    reviewDate.textContent = '-';
                }
                
                reviewTime.textContent = selectedTime || '-';
            }
            
            // Validate Step 1
            function validateStep1() {
                if (!fullNameInput.value.trim()) {
                    alert('Please enter your full name');
                    fullNameInput.focus();
                    return false;
                }
                
                if (!phoneInput.value.trim()) {
                    alert('Please enter your phone number');
                    phoneInput.focus();
                    return false;
                }
                
                if (!emailInput.value.trim()) {
                    alert('Please enter your email address');
                    emailInput.focus();
                    return false;
                }
                
                if (!serviceSelect.value) {
                    alert('Please select a service');
                    serviceSelect.focus();
                    return false;
                }
                
                return true;
            }
            
            // Validate Step 2
            function validateStep2() {
                if (!selectedDate) {
                    alert('Please select a date');
                    return false;
                }
                
                if (!selectedTime) {
                    alert('Please select a time');
                    return false;
                }
                
                return true;
            }
            
            // Form Submission
            bookingForm.addEventListener('submit', function(event) {
                event.preventDefault();
                
                // Validate all steps
                if (!validateStep1() || !validateStep2()) {
                    alert('Please complete all required fields');
                    goToStep(1);
                    return;
                }
                
                // Show loading state on button
                const originalText = submitBookingBtn.innerHTML;
                submitBookingBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                submitBookingBtn.disabled = true;
                
                // Simulate API call with delay
                setTimeout(function() {
                    // Reset button state
                    submitBookingBtn.innerHTML = originalText;
                    submitBookingBtn.disabled = false;
                    
                    // Hide form and show success message
                    bookingForm.style.display = 'none';
                    successMessage.classList.add('active');
                    
                    // Generate booking reference
                    const bookingRef = 'BK-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
                    document.getElementById('bookingRef').textContent = bookingRef;
                    
                    // Show confirmation details
                    const confirmationDetails = document.getElementById('confirmationDetails');
                    confirmationDetails.innerHTML = `
                        <h4>Appointment Details</h4>
                        <div class="detail-item">
                            <span class="detail-label">Name:</span>
                            <span class="detail-value">${fullNameInput.value}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Service:</span>
                            <span class="detail-value">${serviceSelect.options[serviceSelect.selectedIndex].text}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Date:</span>
                            <span class="detail-value">${reviewDate.textContent}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Time:</span>
                            <span class="detail-value">${selectedTime}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Reference:</span>
                            <span class="detail-value">${bookingRef}</span>
                        </div>
                    `;
                    
                    // Reset form (optional)
                    // bookingForm.reset();
                    // selectedDate = null;
                    // selectedTime = null;
                    // goToStep(1);
                    
                }, 1500); // Simulate network delay
            });
            
            // Close Success Message
            closeSuccessBtn.addEventListener('click', function() {
                successMessage.classList.remove('active');
                bookingForm.style.display = 'block';
                
                // Reset form and go to step 1
                bookingForm.reset();
                selectedDate = null;
                selectedTime = null;
                initDateInput();
                generateTimeSlots();
                goToStep(1);
            });
            
            // Calendar Navigation
            prevMonthBtn.addEventListener('click', function() {
                currentMonth--;
                if (currentMonth < 0) {
                    currentMonth = 11;
                    currentYear--;
                }
                generateCalendar();
                updateSelectedDateInCalendar();
            });
            
            nextMonthBtn.addEventListener('click', function() {
                currentMonth++;
                if (currentMonth > 11) {
                    currentMonth = 0;
                    currentYear++;
                }
                generateCalendar();
                updateSelectedDateInCalendar();
            });
            
            // Date Input Change
            bookingDateInput.addEventListener('change', function() {
                selectDate(this.value);
            });
            
            // Time Select Change
            bookingTimeSelect.addEventListener('change', function() {
                if (this.value) {
                    selectTime(this.value);
                }
            });
            
            // Navigation Events
            nextToStep2Btn.addEventListener('click', function() {
                if (validateStep1()) {
                    goToStep(2);
                }
            });
            
            nextToStep3Btn.addEventListener('click', function() {
                if (validateStep2()) {
                    goToStep(3);
                }
            });
            
            backToStep1Btn.addEventListener('click', function() {
                goToStep(1);
            });
            
            backToStep2Btn.addEventListener('click', function() {
                goToStep(2);
            });
        });