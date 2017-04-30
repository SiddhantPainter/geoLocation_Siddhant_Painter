$(document).ready(function(){

    describe('GeoLocation', function() {

       var TestResponses = {
            myLocation: {
                status: 200,
                responseText: '{"query":"1.2.3.4","lat":37.5,"lon":-121.9}'
            },
            avenueCodeLocation: {
                status: 200,
                responseText: '{"query":"4.3.2.1","lat":33.6119,"lon":-111.8906}'
            },
            avenueCodeStats: {
                status: 200,
                responseText: '{"answer":[{"rdata":"184.168.38.32"}]}'
            }
        };

        beforeEach(function() {
            jasmine.Ajax.install();
        });

        afterEach(function() {
            jasmine.Ajax.uninstall();
        });

        describe('initialization', function () {

            it('should compile the Handlebars templates', function() {
                expect(typeof window.locationTemplate).toBe('function');
                expect(typeof window.messageTemplate).toBe('function');
                expect(typeof window.historyTemplate).toBe('function');
            });

            it('should start with blank content', function() {
                expect($('#query').text()).toBe('0.0.0.0');
                expect($('#googleMap a').length).toBe(0);
            });
        });

        describe('locate yourself', function () {

            beforeEach(function(done) {
                $('#btnGetMyLocation').click();
                jasmine.Ajax.requests.mostRecent().respondWith(TestResponses.myLocation);

                preCondition(function() {
                    return $('#googleMap a').length > 0;
                }, done, 100);
            });

            it('should get your location', function () {
                expect($('#query').text()).toBe('1.2.3.4');
                expect($('#googleMap a[href*="37.5,-121.9"]').length).toBeGreaterThan(0);
            })

        });

        describe('reset location', function () {

            beforeEach(function() {
                $('#btnResetLocation').click();
            });

            it('should reset your location', function () {
                expect($('#query').text()).toBe('0.0.0.0');
                expect($('#googleMap a').length).toBe(0);
            })

        });

        describe('locate avenuecode.com', function () {

            beforeEach(function(done) {
                $('#txtWebsite').text('http://avenuecode.com')
                $('#formGeoLocation').submit();
                jasmine.Ajax.requests.mostRecent().respondWith(TestResponses.avenueCodeStats);
                jasmine.Ajax.requests.mostRecent().respondWith(TestResponses.avenueCodeLocation);

                preCondition(function() {
                    return $('#googleMap a').length > 0;
                }, done, 100);
            });

            it('should get avenuecode.com location', function () {
                expect($('#query').text()).toBe('4.3.2.1');
                expect($('#googleMap a[href*="33.6119,-111.8906"]').length).toBeGreaterThan(0);
            })

        });
		/*****
		New cases
		*****/
		describe('View History Table', function () {
			beforeEach(function() {
                $('#historyBtn').click();
            });
			it('should check the history table is visible', function () {
				 expect(document.getElementById('historyCenter').style.display).toBe('inline-block');
            })
		});
		
		describe('Hide History Table', function () {
			beforeEach(function() {
				$('#historyBtn').click();
                $('#closeHistory').click();
            });
			it('should check the history table is hidden', function () {
				 expect(document.getElementById('historyCenter').style.display).toBe('none');
            })
		});
		
		describe('History Link Click', function () {
			beforeEach(function() {
				$('#historyBtn').click();
                $('a.history').click();
            });
			it('should check the value after click', function () {
				 expect($('#query').text.length).not.toEqual(0);
            })
		});
		
		describe('Clear History Test', function () {
			beforeEach(function() {
				$('#historyBtn').click();
                $('#clearHistory').click();
            });
			it('should check the history is cleared', function () {
				var locations = (localStorage.getItem("locations")) ? JSON.parse(localStorage.getItem("locations")) : [];
				expect(locations.length).toBe(0);
            })
		});
    });

});
