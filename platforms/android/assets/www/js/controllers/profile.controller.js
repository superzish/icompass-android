angular.module('iComPAsS.controllers')

.controller('ProfileCtrl', function($scope, ProfileService){
  $scope.showLoading();

  $scope.tab = 1;

  $scope.populateProfile = function(){
    $scope.user_profile = {};

    if($scope.isPatient()){
      ProfileService.get_patient_profile().then(function(data) {
        $scope.hideLoading();

        $scope.user_profile = $scope.getBasicInfo(data);

        // Parse JSON form data.weights
        var weights = [];
        for (var i = 0; i < data.profile.weights.length; i++) {
          weights.push(JSON.parse(data.profile.weights[i]));
        }

        $scope.user_profile.more = [
          {
            'label': 'Diagnosis',
            'data': [data.profile.diagnosis]
          },
          {
            'label': 'Allergies',
            'data': data.profile.allergies.split(', ')
          },
          {
            'label': 'Initial Height',
            'data': [data.profile.height + ' cm']
          },
          {
            'label': 'Weight',
            'data': weights
          }
        ];
      })
      .finally(function(){
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      });
    }else if($scope.isDoctor()){
      ProfileService.get_doctor_profile().then(function(data) {
        $scope.hideLoading();

        $scope.user_profile = $scope.getBasicInfo(data);

        $scope.user_profile.more = [
          {
            'label': 'Specialty',
            'data': [data.profile.specialty]
          },
          {
            'label': 'Availability',
            'data': [data.profile.available]
          }
        ];
      })
      .finally(function(){
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      });
    }

    $scope.getBasicInfo = function(data) {
      return {
        'image': data.meta.profile_pic,
        'fullname': data.profile.fname + ' ' + data.profile.mname + ' ' + data.profile.lname,
        'basic_info': [
          {
            'label': 'Username',
            'data': data.profile.username
          },
          {
            'label': 'Contact No.',
            'data': data.profile.contactnumber
          },
          {
            'label': 'E-mail',
            'data': data.profile.email
          },
          {
            'label': 'Birthday',
            'data': data.profile.bday
          },
          {
            'label': 'Age',
            'data': data.profile.age
          },
          {
            'label': 'Sex',
            'data': data.profile.gender === 'm'? 'Male' : 'Female'
          }
        ]
      };
    };
  };

  $scope.populateProfile();
});
