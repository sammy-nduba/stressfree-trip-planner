import { useState } from 'react';

export default function PlannerReact() {
	// Travel Details State
	const [travelDetails, setTravelDetails] = useState({
		destination: '',
		startDate: '',
		endDate: '',
		adults: 2,
		children: 0,
		budget: '',
		travelStyle: '',
		interests: [],
		contactName: '',
		contactEmail: '',
		contactPhone: '',
		additionalNotes: ''
	});

	// Submission State
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'
	const [submitMessage, setSubmitMessage] = useState('');
	const [validationErrors, setValidationErrors] = useState({});


	// Checklist State
	const [steps, setSteps] = useState([
		{ id: 1, label: 'Research destination activities', done: false },
		{ id: 2, label: 'Book accommodation', done: false },
		{ id: 3, label: 'Arrange transportation', done: false },
		{ id: 4, label: 'Check visa requirements', done: false }
	]);
	const [input, setInput] = useState('');
	const [currentStep, setCurrentStep] = useState(1); // 1: Details, 2: Checklist

	const destinations = [
		'Kenya', 'Uganda', 'Ethiopia', 'Tanzania', 'South Africa', 'Morocco',
		'Egypt', 'Zanzibar', 'Rwanda', 'Botswana', 'Namibia', 'Madagascar'
	];

	const travelStyles = [
		'Adventure', 'Relaxation', 'Cultural', 'Wildlife Safari', 'Beach', 'City Break', 'Luxury', 'Budget'
	];

	const interestOptions = [
		'Wildlife', 'Beaches', 'Mountains', 'History', 'Food & Cuisine',
		'Photography', 'Shopping', 'Nightlife', 'Nature', 'Adventure Sports'
	];

	const handleDetailChange = (field, value) => {
		setTravelDetails(prev => ({ ...prev, [field]: value }));
		// Clear error when user types
		if (validationErrors[field]) {
			setValidationErrors(prev => {
				const newErrors = { ...prev };
				delete newErrors[field];
				return newErrors;
			});
		}
	};

	const handleInterestToggle = (interest) => {
		setTravelDetails(prev => ({
			...prev,
			interests: prev.interests.includes(interest)
				? prev.interests.filter(i => i !== interest)
				: [...prev.interests, interest]
		}));
	};

	const validateForm = () => {
		const errors = {};
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		if (travelDetails.startDate) {
			const start = new Date(travelDetails.startDate);
			if (start < today) {
				errors.startDate = "Start date cannot be in the past";
			}
		}

		if (travelDetails.startDate && travelDetails.endDate) {
			const start = new Date(travelDetails.startDate);
			const end = new Date(travelDetails.endDate);
			if (end < start) {
				errors.endDate = "End date must be after start date";
			}
		}

		if (travelDetails.contactPhone) {
			// Basic phone validation (allows +, spaces, dashes, parentheses, and digits)
			const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
			if (!phoneRegex.test(travelDetails.contactPhone)) {
				errors.contactPhone = "Please enter a valid phone number";
			}
		}

		setValidationErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async () => {
		if (!validateForm()) {
			setSubmitStatus('error');
			setSubmitMessage('Please fix the errors in the form before submitting.');
			return;
		}

		setIsSubmitting(true);
		setSubmitStatus(null);
		setSubmitMessage('');

		try {
			const response = await fetch('/api/trip-requests', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					destination: travelDetails.destination,
					start_date: travelDetails.startDate,
					end_date: travelDetails.endDate,
					adults: travelDetails.adults,
					children: travelDetails.children,
					budget: travelDetails.budget,
					travel_style: travelDetails.travelStyle,
					interests: travelDetails.interests,
					contact_name: travelDetails.contactName,
					contact_email: travelDetails.contactEmail,
					contact_phone: travelDetails.contactPhone,
					additional_notes: travelDetails.additionalNotes
				})
			});

			const data = await response.json();

			if (response.ok) {
				setSubmitStatus('success');
				// No reload, just show success view
			} else {
				setSubmitStatus('error');
				setSubmitMessage(data.error || 'Failed to submit request. Please try again.');
			}
		} catch (error) {
			setSubmitStatus('error');
			setSubmitMessage('An error occurred. Please check your connection and try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	const resetForm = () => {
		setTravelDetails({
			destination: '',
			startDate: '',
			endDate: '',
			adults: 2,
			children: 0,
			budget: '',
			travelStyle: '',
			interests: [],
			contactName: '',
			contactEmail: '',
			contactPhone: '',
			additionalNotes: ''
		});
		setSubmitStatus(null);
		setCurrentStep(1);
		setValidationErrors({});
	};

	const addStep = () => {
		if (input.trim()) {
			setSteps([...steps, { id: Date.now(), label: input, done: false }]);
			setInput('');
		}
	};

	const toggleStep = (id) => {
		setSteps(steps.map(s => s.id === id ? { ...s, done: !s.done } : s));
	};

	const removeStep = (id) => {
		setSteps(steps.filter(s => s.id !== id));
	};

	const completedCount = steps.filter(s => s.done).length;
	const progress = steps.length > 0 ? (completedCount / steps.length) * 100 : 0;

	const isDetailsComplete = travelDetails.destination && travelDetails.startDate && travelDetails.endDate && travelDetails.contactName && travelDetails.contactEmail;


	if (submitStatus === 'success') {
		return (
			<div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-12 text-center">
				<div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
					<span className="text-5xl">✨</span>
				</div>
				<h3 className="text-4xl font-['Playfair_Display'] text-[#006064] mb-4">
					Trip Request Received!
				</h3>
				<p className="text-xl text-[#006064]/70 mb-8">
					Thank you, <strong>{travelDetails.contactName}</strong>! We've received your request for a trip to <strong>{travelDetails.destination}</strong>.
				</p>
				<div className="bg-[#E0F7FA] p-6 rounded-xl mb-8 text-left max-w-md mx-auto">
					<p className="text-[#006064] mb-2">We will review your details and get back to you at <strong>{travelDetails.contactEmail}</strong> shortly with a custom quote.</p>
					<p className="text-[#006064] text-sm">Reference ID: #{Math.floor(Math.random() * 10000)}</p>
				</div>
				<div className="flex gap-4 justify-center">
					<button
						onClick={resetForm}
						className="px-8 py-3 bg-[#26A69A] text-white rounded-full hover:bg-[#1F8B7F] transition-colors font-medium"
					>
						Plan Another Trip
					</button>
					<a
						href="/"
						className="px-8 py-3 border-2 border-[#26A69A] text-[#26A69A] rounded-full hover:bg-[#E0F7FA] transition-colors font-medium"
					>
						Back to Home
					</a>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-5xl mx-auto">
			{/* Step Indicator */}
			<div className="flex justify-center mb-8">
				<div className="flex items-center gap-4">
					<div className={`flex items-center gap-2 ${currentStep === 1 ? 'text-[#26A69A]' : 'text-[#006064]/50'}`}>
						<div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentStep === 1 ? 'bg-[#26A69A] text-white' : 'bg-[#E0F7FA] text-[#006064]'}`}>
							1
						</div>
						<span className="font-medium hidden sm:inline">Travel Details</span>
					</div>
					<div className="w-16 h-1 bg-[#E0F7FA]"></div>
					<div className={`flex items-center gap-2 ${currentStep === 2 ? 'text-[#26A69A]' : 'text-[#006064]/50'}`}>
						<div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentStep === 2 ? 'bg-[#26A69A] text-white' : 'bg-[#E0F7FA] text-[#006064]'}`}>
							2
						</div>
						<span className="font-medium hidden sm:inline">Planning Checklist</span>
					</div>
				</div>
			</div>

			{/* Step 1: Travel Details Form */}
			{currentStep === 1 && (
				<div className="bg-white rounded-3xl shadow-lg p-8">
					<h3 className="text-3xl font-['Playfair_Display'] text-[#006064] mb-2">
						Where would you like to go?
					</h3>
					<p className="text-[#006064]/70 mb-8">Tell us about your dream trip</p>

					<div className="space-y-6">
						{/* Destination */}
						<div>
							<label className="block text-[#006064] font-medium mb-2">
								Destination <span className="text-[#FF8A65]">*</span>
							</label>
							<select
								value={travelDetails.destination}
								onChange={(e) => handleDetailChange('destination', e.target.value)}
								className="w-full px-4 py-3 rounded-xl border border-[#E0F7FA] focus:outline-none focus:ring-2 focus:ring-[#26A69A] bg-[#FFF8E1]"
							>
								<option value="">Select a destination</option>
								{destinations.map(dest => (
									<option key={dest} value={dest}>{dest}</option>
								))}
							</select>
						</div>

						{/* Dates */}
						<div className="grid md:grid-cols-2 gap-4">
							<div>
								<label className="block text-[#006064] font-medium mb-2">
									Start Date <span className="text-[#FF8A65]">*</span>
								</label>
								<input
									type="date"
									value={travelDetails.startDate}
									onChange={(e) => handleDetailChange('startDate', e.target.value)}
									className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 bg-[#FFF8E1] ${validationErrors.startDate ? 'border-red-500 focus:ring-red-200' : 'border-[#E0F7FA] focus:ring-[#26A69A]'}`}
								/>
								{validationErrors.startDate && <p className="text-red-500 text-sm mt-1">{validationErrors.startDate}</p>}
							</div>
							<div>
								<label className="block text-[#006064] font-medium mb-2">
									End Date <span className="text-[#FF8A65]">*</span>
								</label>
								<input
									type="date"
									value={travelDetails.endDate}
									onChange={(e) => handleDetailChange('endDate', e.target.value)}
									className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 bg-[#FFF8E1] ${validationErrors.endDate ? 'border-red-500 focus:ring-red-200' : 'border-[#E0F7FA] focus:ring-[#26A69A]'}`}
								/>
								{validationErrors.endDate && <p className="text-red-500 text-sm mt-1">{validationErrors.endDate}</p>}
							</div>
						</div>

						{/* Travelers */}
						<div className="grid md:grid-cols-2 gap-4">
							<div>
								<label className="block text-[#006064] font-medium mb-2">
									Adults (18+)
								</label>
								<div className="flex items-center gap-4">
									<button
										onClick={() => handleDetailChange('adults', Math.max(1, travelDetails.adults - 1))}
										className="w-10 h-10 rounded-full bg-[#E0F7FA] text-[#006064] hover:bg-[#26A69A] hover:text-white transition-colors font-bold"
									>
										−
									</button>
									<span className="text-2xl font-bold text-[#006064] w-12 text-center">{travelDetails.adults}</span>
									<button
										onClick={() => handleDetailChange('adults', travelDetails.adults + 1)}
										className="w-10 h-10 rounded-full bg-[#E0F7FA] text-[#006064] hover:bg-[#26A69A] hover:text-white transition-colors font-bold"
									>
										+
									</button>
								</div>
							</div>
							<div>
								<label className="block text-[#006064] font-medium mb-2">
									Children (0-17)
								</label>
								<div className="flex items-center gap-4">
									<button
										onClick={() => handleDetailChange('children', Math.max(0, travelDetails.children - 1))}
										className="w-10 h-10 rounded-full bg-[#E0F7FA] text-[#006064] hover:bg-[#26A69A] hover:text-white transition-colors font-bold"
									>
										−
									</button>
									<span className="text-2xl font-bold text-[#006064] w-12 text-center">{travelDetails.children}</span>
									<button
										onClick={() => handleDetailChange('children', travelDetails.children + 1)}
										className="w-10 h-10 rounded-full bg-[#E0F7FA] text-[#006064] hover:bg-[#26A69A] hover:text-white transition-colors font-bold"
									>
										+
									</button>
								</div>
							</div>
						</div>

						{/* Budget */}
						<div>
							<label className="block text-[#006064] font-medium mb-2">
								Budget (Optional)
							</label>
							<select
								value={travelDetails.budget}
								onChange={(e) => handleDetailChange('budget', e.target.value)}
								className="w-full px-4 py-3 rounded-xl border border-[#E0F7FA] focus:outline-none focus:ring-2 focus:ring-[#26A69A] bg-[#FFF8E1]"
							>
								<option value="">Select budget range</option>
								<option value="budget">Budget ($500 - $1,500)</option>
								<option value="moderate">Moderate ($1,500 - $3,000)</option>
								<option value="luxury">Luxury ($3,000+)</option>
							</select>
						</div>

						{/* Travel Style */}
						<div>
							<label className="block text-[#006064] font-medium mb-2">
								Travel Style
							</label>
							<select
								value={travelDetails.travelStyle}
								onChange={(e) => handleDetailChange('travelStyle', e.target.value)}
								className="w-full px-4 py-3 rounded-xl border border-[#E0F7FA] focus:outline-none focus:ring-2 focus:ring-[#26A69A] bg-[#FFF8E1]"
							>
								<option value="">Select your style</option>
								{travelStyles.map(style => (
									<option key={style} value={style}>{style}</option>
								))}
							</select>
						</div>

						{/* Contact Information */}
						<div className="border-t border-[#E0F7FA] pt-6 mt-6">
							<h4 className="text-xl font-['Playfair_Display'] text-[#006064] mb-4">Contact Information</h4>

							<div className="space-y-4">
								{/* Contact Name */}
								<div>
									<label className="block text-[#006064] font-medium mb-2">
										Your Name <span className="text-[#FF8A65]">*</span>
									</label>
									<input
										type="text"
										value={travelDetails.contactName}
										onChange={(e) => handleDetailChange('contactName', e.target.value)}
										placeholder="John Doe"
										className="w-full px-4 py-3 rounded-xl border border-[#E0F7FA] focus:outline-none focus:ring-2 focus:ring-[#26A69A] bg-[#FFF8E1]"
									/>
								</div>

								{/* Contact Email */}
								<div>
									<label className="block text-[#006064] font-medium mb-2">
										Email Address <span className="text-[#FF8A65]">*</span>
									</label>
									<input
										type="email"
										value={travelDetails.contactEmail}
										onChange={(e) => handleDetailChange('contactEmail', e.target.value)}
										placeholder="john@example.com"
										className="w-full px-4 py-3 rounded-xl border border-[#E0F7FA] focus:outline-none focus:ring-2 focus:ring-[#26A69A] bg-[#FFF8E1]"
									/>
								</div>

								{/* Contact Phone */}
								<div>
									<label className="block text-[#006064] font-medium mb-2">
										Phone Number (Optional)
									</label>
									<input
										type="tel"
										value={travelDetails.contactPhone}
										onChange={(e) => handleDetailChange('contactPhone', e.target.value)}
										placeholder="+254 700 000000"
										className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 bg-[#FFF8E1] ${validationErrors.contactPhone ? 'border-red-500 focus:ring-red-200' : 'border-[#E0F7FA] focus:ring-[#26A69A]'}`}
									/>
									{validationErrors.contactPhone && <p className="text-red-500 text-sm mt-1">{validationErrors.contactPhone}</p>}
								</div>
							</div>
						</div>

						{/* Interests */}
						<div>
							<label className="block text-[#006064] font-medium mb-2">
								Interests (Select all that apply)
							</label>
							<div className="flex flex-wrap gap-2">
								{interestOptions.map(interest => (
									<button
										key={interest}
										onClick={() => handleInterestToggle(interest)}
										className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${travelDetails.interests.includes(interest)
											? 'bg-[#26A69A] text-white'
											: 'bg-[#E0F7FA] text-[#006064] hover:bg-[#26A69A] hover:text-white'
											}`}
									>
										{interest}
									</button>
								))}
							</div>
						</div>

						{/* Summary */}
						{isDetailsComplete && (
							<div className="bg-[#E0F7FA] p-6 rounded-xl">
								<h4 className="font-bold text-[#006064] mb-3">Trip Summary</h4>
								<div className="space-y-2 text-sm text-[#006064]/80">
									<p>📍 <strong>Destination:</strong> {travelDetails.destination}</p>
									<p>📅 <strong>Dates:</strong> {travelDetails.startDate} to {travelDetails.endDate}</p>
									<p>👥 <strong>Travelers:</strong> {travelDetails.adults} Adult{travelDetails.adults > 1 ? 's' : ''}{travelDetails.children > 0 ? `, ${travelDetails.children} Child${travelDetails.children > 1 ? 'ren' : ''}` : ''}</p>
									{travelDetails.budget && <p>💰 <strong>Budget:</strong> {travelDetails.budget}</p>}
									{travelDetails.travelStyle && <p>✨ <strong>Style:</strong> {travelDetails.travelStyle}</p>}
									{travelDetails.interests.length > 0 && <p>❤️ <strong>Interests:</strong> {travelDetails.interests.join(', ')}</p>}
								</div>
							</div>
						)}
					</div>

					{/* Next Button */}
					<button
						onClick={() => {
							if (validateForm()) {
								setCurrentStep(2);
							}
						}}
						disabled={!isDetailsComplete}
						className={`w-full mt-8 px-6 py-4 rounded-full font-medium transition-all ${isDetailsComplete
							? 'bg-[#26A69A] text-white hover:bg-[#1F8B7F] hover:scale-105'
							: 'bg-[#E0F7FA] text-[#006064]/50 cursor-not-allowed'
							}`}
					>
						Continue to Planning Checklist →
					</button>
				</div>
			)}

			{/* Step 2: Planning Checklist */}
			{currentStep === 2 && (
				<div className="bg-white rounded-3xl shadow-lg p-8">
					<button
						onClick={() => setCurrentStep(1)}
						className="text-[#26A69A] hover:text-[#006064] mb-4 flex items-center gap-2"
					>
						← Back to Travel Details
					</button>

					<h3 className="text-3xl font-['Playfair_Display'] text-[#006064] mb-2">
						Your Planning Checklist
					</h3>
					<p className="text-[#006064]/70 mb-8">Stay organized and stress-free</p>

					<div className="mb-8">
						<div className="w-full bg-[#E0F7FA] rounded-full h-3 overflow-hidden">
							<div
								className="bg-[#26A69A] h-full transition-all duration-500 ease-out"
								style={{ width: `${progress}%` }}
							></div>
						</div>
						<p className="text-sm text-[#006064]/70 mt-2">
							{completedCount} of {steps.length} tasks complete
						</p>
					</div>

					<div className="space-y-3 mb-6">
						{steps.map((step) => (
							<div
								key={step.id}
								className="flex items-center gap-3 p-4 bg-[#FFF8E1] rounded-xl hover:shadow-md transition-shadow"
							>
								<input
									type="checkbox"
									checked={step.done}
									onChange={() => toggleStep(step.id)}
									className="w-5 h-5 cursor-pointer rounded accent-[#26A69A]"
								/>
								<span
									className={`flex-1 ${step.done
										? 'line-through text-[#006064]/50'
										: 'text-[#006064]'
										}`}
								>
									{step.label}
								</span>
								<button
									onClick={() => removeStep(step.id)}
									className="text-[#FF8A65] hover:text-[#FF8A65]/70 transition-colors"
								>
									✕
								</button>
							</div>
						))}
					</div>

					<div className="flex gap-3 mb-6">
						<input
							type="text"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={(e) => e.key === 'Enter' && addStep()}
							placeholder="Add a planning task..."
							className="flex-1 px-4 py-3 rounded-full border border-[#E0F7FA] focus:outline-none focus:ring-2 focus:ring-[#26A69A] bg-[#FFF8E1]"
						/>
						<button
							onClick={addStep}
							className="px-6 py-3 bg-[#26A69A] text-white rounded-full hover:bg-[#1F8B7F] transition-colors font-medium"
						>
							Add Task
						</button>
					</div>

					{/* Success/Error Messages */}
					{submitStatus && submitStatus !== 'success' && (
						<div className="mt-6 p-4 rounded-xl bg-red-50 border-2 border-red-500 text-red-800">
							<p className="font-medium flex items-center gap-2">
								✗ {submitMessage}
							</p>
						</div>
					)}

					{/* Submit Request Button */}
					<button
						onClick={handleSubmit}
						disabled={isSubmitting}
						className={`w-full px-6 py-4 rounded-full font-medium transition-all ${isSubmitting
							? 'bg-gray-400 text-white cursor-not-allowed'
							: 'bg-[#FF8A65] text-white hover:bg-[#E67E50] hover:scale-105'
							}`}
					>
						{isSubmitting ? 'Submitting...' : 'Submit Trip Request'}
					</button>
				</div>
			)}
		</div>
	);
}
