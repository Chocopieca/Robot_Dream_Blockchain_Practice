// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

contract Storage {
    struct Student {
        string firstname;
        string lastname;
        uint age;
    }
    Student student;
    event UsesrName(string firstname);

    function setStudent(string calldata firstname, string calldata lastname, uint age) external {
        emit UsesrName(firstname);
        student.firstname = firstname;
        student.lastname = lastname;
        setAge(age);
    }

    function setAge(uint age) private {
        student.age = age;
    }

    function getStudent() external view returns (Student memory) {
        return student;
    }

    function getStudentName() external view returns (string memory) {
        return student.firstname;
    }
}
